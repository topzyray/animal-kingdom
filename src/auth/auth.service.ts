import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { LoginDto } from './dtos/login.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schemas/referesh-token.schema';
import { v4 as uuidv4 } from 'uuid';
import { RefreshTokenDto } from './dtos/refresh-tokens.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { nanoid } from 'nanoid';
import { ResetToken } from './schemas/reset-token.schema';
import { MailService } from 'src/services/mail.service';
import { ResetPasswordDto } from './dtos/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
    @InjectModel(ResetToken.name)
    private resetTokenModel: Model<ResetToken>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async signup(signupData: SignupDto) {
    // Extract the incoming data
    const { email, password, firstName, lastName } = signupData;
    // Check if user already exist
    const existingUser = await this.userModel.findOne({ email: email });
    if (existingUser) {
      throw new BadRequestException('User already exist!');
    }
    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);
    // Create new user
    const newUser = await this.userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    if (!newUser) {
      return new InternalServerErrorException('Fail to create user!');
    }
    // Extract password
    const { password: createdPassword, ...rest } = newUser.toObject();
    return { ...rest };
  }

  async login(loginData: LoginDto) {
    const { email, password } = loginData;
    // Check if user already exist
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new UnauthorizedException('Wrong credentials!');
    }

    // Compare existing password with entered password
    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials!');
    }

    // Generate JWT tokens
    const tokens = await this.generateUserTokens(user._id);
    return {
      ...tokens,
      userId: user._id,
    };
  }

  async refreshTokens(refreshTokenData: RefreshTokenDto) {
    const token = await this.refreshTokenModel.findOne({
      token: refreshTokenData.refreshToken,
      expiryDate: { $gte: new Date() },
    });

    if (!token) {
      throw new UnauthorizedException('Refresh token is invalid!');
    }

    return this.generateUserTokens(token.userId);
  }

  async generateUserTokens(userId) {
    const payload = { sub: userId };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = uuidv4();

    await this.storeRefreshToken(refreshToken, userId);
    return {
      accessToken,
      refreshToken,
    };
  }

  async storeRefreshToken(token: string, userId: string) {
    // Calculate expiry date 3 days from now
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);
    await this.refreshTokenModel.updateOne(
      { userId },
      { $set: { expiryDate, token } },
      { upsert: true },
    );
  }

  async changePassword(changePasswordData: ChangePasswordDto, userId: string) {
    const { oldPassword, newPassword } = changePasswordData;
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const passwordMatch = await bcryptjs.compare(oldPassword, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials!');
    }

    const newHashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = newHashedPassword;
    await user.save();

    return 'Password changed successfully. Proceed to login!';
  }

  async forgotPassword(forgotPasswordData: ForgotPasswordDto) {
    const { email } = forgotPasswordData;
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      return { message: 'If this user exists, they will receive an email.' };
    }

    // Generate password reset link
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);
    const resetToken = nanoid(64);
    await this.resetTokenModel.create({
      token: resetToken,
      userId: user._id,
      expiryDate,
    });

    // Send link to user by email
    this.mailService.sendPasswordResetEmail(email, resetToken, user.firstName);

    return { message: 'If this user exists, they will receive an email.' };
  }

  async resetPassword(resetPasswordData: ResetPasswordDto) {
    const { resetToken, newPassword } = resetPasswordData;
    const validToken = await this.resetTokenModel.findOneAndDelete({
      token: resetToken,
      expiryDate: { $gte: new Date() },
    });

    if (!validToken) {
      throw new UnauthorizedException('Invalid link');
    }

    const user = await this.userModel.findById(validToken.userId);
    if (!user) {
      throw new InternalServerErrorException();
    }
    const newHashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = newHashedPassword;
    await user.save();
    return 'Password changed successfully!';
  }
}

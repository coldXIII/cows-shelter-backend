import { Controller, Post, Body } from '@nestjs/common';
import { PasswordService } from './password.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('forgot')
  async forgotPassword(@Body('email') email: string) {
    return this.passwordService.sendMail(email);
  }

  @Post('reset')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.passwordService.resetPassword(resetPasswordDto);
  }

  @Post('change')
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.passwordService.changePassword(changePasswordDto);
  }
}

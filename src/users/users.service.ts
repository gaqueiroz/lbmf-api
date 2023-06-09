import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import * as uuid from 'uuid';
import { Repository } from 'typeorm';
import { isBefore } from 'date-fns';
import * as bcrypt from 'bcrypt';

import { AppError } from '~/shared/errors/app.error';
import { SignInUserLoginRequestDTO } from '~/auth/dtos/signin-user-login-request.dto';

import { UsersCategory } from './entities/users-category.entity';
import { User } from './entities/user.entity';
import { UserSetting } from './entities/user-settings.entity';
import { UserLogin } from './entities/user-login.entity';
import { UserDevice } from './entities/user-device.entity';
import { UpdateUserSetttingsRequestDTO } from './dtos/update-user-settings-request.dto';
import { UpdateUserRequestDTO } from './dtos/update-user-request.dto';
import { ResetUserPasswordRequestDTO } from './dtos/reset-user-password-request.dto';
import { CreateUserRequestDTO } from './dtos/create-user-request.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserLogin)
    private readonly userLoginRepository: Repository<UserLogin>,
    @InjectRepository(UserDevice)
    private readonly userDeviceRepository: Repository<UserDevice>,
    @InjectRepository(UserSetting)
    private readonly userSettingRepository: Repository<UserSetting>,
    @InjectRepository(UsersCategory)
    private readonly userCategoryRepository: Repository<UsersCategory>
  ) {}

  public async findById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ Id: id });
  }

  public async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ Username: username });
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async create(data: CreateUserRequestDTO): Promise<User> {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.Password, salt);

    const user = await this.userRepository.save({
      ...data,
      Key: uuid.v4(),
      Password: hash,
      CreateDate: new Date(),
    });

    await this.userSettingRepository.save({
      Language: 'pt-br',
      CommentsNotification: true,
      CommentsPrivacy: true,
      GeolocationPrivacy: true,
      GeolocationRadius: '',
      LikesNotification: true,
      MentionsPrivacy: true,
      MessagesNotification: true,
      MessagesPrivacy: true,
      ProfilePrivacy: true,
      TempsPrivacy: true,
      UserId: user.Id,
    } as UserSetting);

    return user;
  }

  public async update(
    userId: number,
    userKey: string,
    data: UpdateUserRequestDTO
  ): Promise<User> {
    await this.validateUser(userId, userKey);

    await this.userRepository.update({ Key: userKey }, { ...data });

    const updatedUser = await this.userRepository.findOneBy({
      Id: userId,
    });

    return updatedUser;
  }

  public async updateSettings(
    userId: number,
    userKey: string,
    data: UpdateUserSetttingsRequestDTO
  ): Promise<UserSetting> {
    await this.validateUser(userId, userKey);

    await this.userSettingRepository.update(
      { UserId: userId },
      {
        ...data,
      }
    );

    const user = await this.findById(userId);

    const updatedUserSettings = await this.findSettingsByUserId(user.Key);

    return updatedUserSettings;
  }

  public async findSettingsByUserId(
    userKey: string,
    userId?: number | undefined
  ): Promise<UserSetting> {
    if (userId) {
      await this.validateUser(userId, userKey);
    }

    const userSettings = await this.userSettingRepository.findOneBy({
      UserId: userId,
    });

    return userSettings;
  }

  public async delete(id: number): Promise<void> {
    await this.userRepository.delete({ Id: id });
  }

  public async resetPassword(data: ResetUserPasswordRequestDTO): Promise<void> {
    const findUser = await this.userRepository.findOneBy({
      PasswordRecoveryCode: data.passwordRecoveryCode,
    });

    if (!findUser) {
      throw new AppError(HttpStatus.BAD_REQUEST, {
        message: `The password recovery code "${data.passwordRecoveryCode}" it's invalid.`,
        displayMessage: `O código para recuperação de senha "${data.passwordRecoveryCode}" está inválido.`,
      });
    }

    const passwordRecoveryCodeAlreadyExpired = isBefore(
      findUser.PasswordRecoveryExpirationDate,
      new Date()
    );

    if (passwordRecoveryCodeAlreadyExpired) {
      throw new AppError(HttpStatus.BAD_REQUEST, {
        message: `The code "${data.passwordRecoveryCode}" already expired.`,
        displayMessage: `O código "${data.passwordRecoveryCode}" já expirou.`,
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.newPassword, salt);

    await this.userRepository.update({ Id: findUser.Id }, { Password: hash });
  }

  public async createLoginHistory(
    userId: number,
    loginHistory: SignInUserLoginRequestDTO
  ): Promise<void> {
    await this.userLoginRepository.save({
      Date: new Date(),
      DeviceDescription: loginHistory.device,
      Ip: loginHistory.ip,
      Location: loginHistory.location,
      UserId: userId,
    });
  }

  private async validateUser(userId: number, userKey: string): Promise<void> {
    const user = await this.findById(userId);

    if (user.Key !== userKey) {
      throw new AppError(HttpStatus.BAD_REQUEST, {
        message: 'User does not belong to your account.',
        displayMessage: 'Submit your user ID in the request to change.',
      });
    }
  }
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from 'src/user/user.model'
import { AuthDto } from './dto/auth.dto'
import { hash, genSalt, compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { RefreshTokenDto } from './dto/refreshToken.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto)
    const tokens = await this.issueTokenPair(String(user._id))

    return {
      user: this.returnUserFields(user),
      ...tokens,
    }
  }

  async getNewTokens({ refreshToken }: RefreshTokenDto) {
    if (!refreshToken) throw new UnauthorizedException('Please sign in')

    const result = await this.jwtService.verifyAsync(refreshToken)
    if (!result) throw new UnauthorizedException('invalid token or expired')

    const user = await this.UserModel.findById(result._id)

    const tokens = await this.issueTokenPair(String(user._id))

    return {
      user: this.returnUserFields(user),
      ...tokens,
    }
  }

  async register(dto: AuthDto) {
    const oldUserByEmail = await this.UserModel.findOne({ email: dto.email })
    if (oldUserByEmail)
      throw new BadRequestException(
        'user with this email already in the systems',
      )

    const oldUserByUserName = await this.UserModel.findOne({
      username: dto.username,
    })
    if (oldUserByUserName)
      throw new BadRequestException(
        'user with this username already in the systems',
      )

    const salt = await genSalt(10)

    const newUser = new this.UserModel({
      email: dto.email,
      username: dto.username,
      password: await hash(dto.password, salt),
    })

    await newUser.save()

    const tokens = await this.issueTokenPair(String(newUser._id))
    return {
      user: this.returnUserFields(newUser),
      ...tokens,
    }
  }

  async validateUser(dto: AuthDto): Promise<UserModel> {
    const user = await this.UserModel.findOne({
      email: dto.email,
      username: dto.username,
    })
    if (!user) throw new UnauthorizedException('user not found')

    const isValidPassword = await compare(dto.password, user.password)
    if (!isValidPassword) throw new UnauthorizedException('invalid password')

    return user
  }

  async issueTokenPair(userId: string) {
    const data = {
      _id: userId,
    }

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '15d',
    })

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1h',
    })

    return {
      refreshToken,
      accessToken,
    }
  }

  returnUserFields(user: UserModel) {
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    }
  }
}

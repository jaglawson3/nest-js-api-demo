import { Injectable, ForbiddenException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { Prisma } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}
  async signup(dto: AuthDto) {
    // generate password hash
    const hash = await argon.hash(dto.password);
    // save new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      // return the saved user
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("Email already exists");
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // if the user already exists throw exception
    if (!user) throw new ForbiddenException("Credentials incorrect");

    // compare password
    const pwMatches = await argon.verify(user.hash, dto.password);
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException("Credentials incorrect");

    //send back the user if all goes as expected

    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get("JWT_SECRET");

    const token = await this.jwt.signAsync(payload, {
      expiresIn: "15m",
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}

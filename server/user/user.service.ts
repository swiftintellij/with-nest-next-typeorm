import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "./user.dto";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: UserRepository
    ) { }

    createOneUser(createUserDto: UserDto) {
        return this.userRepository.create(createUserDto).save();
    }

    getUserList() {
        return this.userRepository.find({
            select: ["id", "firstName", "lastName", "age"],
        });
    }

    getDetailUser(id: number) {
        return this.userRepository.findOne(id);
    }

    updateUser(id: number, updateUserDto: UserDto) {
        return this.userRepository.update(id, updateUserDto);
    }

    removeOneUser(id: number) {
        return this.userRepository.delete(id);
    }
}
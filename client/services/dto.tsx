// dto.ts
export interface CreateUserDto {
    username?: string;
    password?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
}
  
  
  export interface UpdateUserDto {
    userName?: string;
    password?: string;
  }
  
  export interface LoginDto {
    userName?: string;
    password?: string;
  }
  
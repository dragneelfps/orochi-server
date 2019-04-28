import IProfileDao from "./profile_dao";
import ProfileRepository from "./profile_repository";
import IUserDao from "./user_dao";
import UserRepository from "./user_repository";

export interface IRepository {
  getUserDao(): IUserDao;
  getProfileDao(): IProfileDao;
}

export default class Repository implements IRepository {
  private userDao: IUserDao;
  private profileDao: IProfileDao;
  constructor() {
    this.userDao = new UserRepository();
    this.profileDao = new ProfileRepository();
  }
  public getUserDao(): IUserDao {
    return this.userDao;
  }
  public getProfileDao(): IProfileDao {
    return this.profileDao;
  }
}

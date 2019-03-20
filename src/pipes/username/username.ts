import { Pipe, PipeTransform } from "@angular/core";
import { User } from "../../interfaces/user";
import { UserProvider } from "../../providers/user/user";

@Pipe({
  name: "username"
})
export class UsernamePipe implements PipeTransform {
  constructor(private userProvider: UserProvider) {}

  transform(userId: number, type: string, ...args) {
    return new Promise((resolve, reject) => {
      this.userProvider.getUserInfoByUserId(userId).subscribe((res: User) => {
        switch (type) {
          case "username":
            resolve(res.username);
          case "fullname":
            res.full_name ? resolve(res.full_name) : resolve(res.username);
        }
      });
    });
  }
}

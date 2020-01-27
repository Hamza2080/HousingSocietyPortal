interface Login {
    email: string;
    password: string;
    deviceId: string;
}


export class LoginImp implements Login {
    email = null;
    password = null;
    deviceId = null;
}

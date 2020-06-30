import Mock from 'mockjs';

type MsgType = string | number;

const success = (msg: MsgType = '', data?: any) => {
     // 这里定义一个成功返回的统一方法，返回我们在axios封装时指定的三个字段
     return {
         code: 0,
         msg,
         data
     }
}

const error = (code: number, msg: MsgType = '', data?: any) => {
    // 再定义一个返回错误状态的方法，一个必传参数是code，即错误码
    return {
        code,
        msg,
        data
    }
}

interface PostResInterface {
    body: string;
    type: 'POST',
    url: string
}

Mock.mock(/\/api\/user\/login/, loginRes)
Mock.mock(/\/api\/user\/get_info/, getInfoRes)

function loginRes(req: PostResInterface) {
    const { user_name, password } = JSON.parse(req.body);
    if (user_name === 'Lison' && String(password) === '123456') {
        return success('登录成功', { user_id: 101 });
    } else {
        return error(1001, '用户名或密码错误');
    }
}

function getInfoRes(req: PostResInterface) {
    return success('', {
        user_name: 'Lison',
        avator: '',
        email: 'xxx@xx.com'
    })
}

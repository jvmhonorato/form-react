import { users, delay } from '../../../config'

export default function (req, res) {
    setTimeout(() => {
        if(req.method ==='GET'){
                res.status(200).json(users)
        }else if(req.method ==='POST'){
            req.status(200).json(req.body)
        }
},delay)
}
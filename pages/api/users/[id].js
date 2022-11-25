import { users, delay } from '../../../config'

export default function handler(req, res) {
    const {id} = req.query

    setTimeout(() => {
     const user = users.find((user) => user.id === Number(id))
    if(user){
        res.status(200).json(user)
    }else {
        res.status(404).json({ error: 'user not found'})
    }
},delay)

}
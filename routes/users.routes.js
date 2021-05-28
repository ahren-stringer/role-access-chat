import express from 'express';
const { Router } = express;
const router = Router()
import User from '../models/User.js'

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user)
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
router.get('/users', async (req, res) => {
  try {
      const users = await User.find();
      res.json(users)
  } catch (e) {
      res.status(500).json({ message: 'Пользовательи не найдены' })
  }
})
// router.get('/users/me', async (req, res) => {
//     try {
//         const id: string = req.user && req.user._id;
//     UserModel.findById(id, (err: any, user: IUser) => {
//       if (err || !user) {
//         return res.status(404).json({
//           message: "User not found",
//         });
//       }
//       res.json(user);
//     });
//     } catch (e) {
//         res.status(500).json({ message: 'Пользователь не найден' })
//     }
// })
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findOneAndRemove({_id:req.params.id});
        res.json({message:'Пользователь удален'})
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
router.post('/users/register', (req, res) => {
    try {
        const postData= {
          email: req.body.email,
          name: req.body.name,
          password: req.body.password,
        };
    
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
          res.status(422).json({ errors: errors.array() });
        } else {
          const user = new User(postData);
    
          user
            .save()
            .then((obj) => {
              res.json(obj);
              // mailer.sendMail(
              //   {
              //     from: "admin@test.com",
              //     to: postData.email,
              //     subject: "Подтверждение почты React Chat Tutorial",
              //     html: `Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:3000/signup/verify?hash=${obj.confirm_hash}">по этой ссылке</a>`,
              //   },
              //   function (err: Error | null, info: SentMessageInfo) {
              //     if (err) {
              //       console.log(err);
              //     } else {
              //       console.log(info);
              //     }
              //   }
              // );
            })
            .catch((reason) => {
              res.status(500).json({
                status: "error",
                message: reason,
              });
            });
        }
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
  })
  router.post('/users/login', async (req, res) => {
      try {
          const postData = {
              email: req.body.email,
              password: req.body.password,
            };
        
            const errors = validationResult(req);
        
            if (!errors.isEmpty()) {
              res.status(422).json({ errors: errors.array() });
            } else {
              User.findOne({ email: postData.email }, (err, user) => {
                if (err || !user) {
                  return res.status(404).json({
                    message: "User not found",
                  });
                }
        
                if (bcrypt.compareSync(postData.password, user.password)) {
                  const token = createJWToken(user);
                  res.json({
                    status: "success",
                    token,
                  });
                } else {
                  res.status(403).json({
                    status: "error",
                    message: "Incorrect password or email",
                  });
                }
              });
            }
      } catch (e) {
          res.status(500).json({ message: 'Пользователь не найден' })
      }
  })
  // Поиск
router.get('/search/:search/:userId', async (req, res) => {
  try {
      const posts = await User.find()
      // console.log(req.params)
      // if (req.params.search==='') res.send([])
      res.json(posts.filter(item => item.name.toLowerCase().includes(req.params.search) && item._id!=req.params.userId).slice(0, 8))
  } catch (e) {
    console.log(e)
      res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

router.get('/search_all/:search/:limit/:skip', async (req, res) => {
  try {
      let posts = await User.find()
      posts = posts.filter(item => item.title.toLowerCase().includes(req.params.search))
          .slice(+req.params.skip, +req.params.skip + +req.params.limit + 1)
      //.limit(+req.params.limit).skip(+req.params.skip)
      res.json({
          "posts": posts,
          "totalCount": posts.length
      })
  } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Что-то пошло не так' })
  }
})
  export default router
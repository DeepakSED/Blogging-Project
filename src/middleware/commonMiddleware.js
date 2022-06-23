// exports.blogCreation = (req, res, next) => {
//   try {
//     const fieldAllowed = [
//       "title",
//       "body",
//       "author_Id",
//       "tags",
//       "category",
//       "subcategory",
//     ];
//     const data = req.body;
//     const keyOf = Object.keys(data);
//     const receivedKey = [];
//     console.log(keyOf.length, fieldAllowed);
//     if (keyOf.length < fieldAllowed.length) {
//       res.status(400).send({ status: "fail", msg: "One more fields missing" });
//     } else {
//       for (let i = 0; i < keyOf.length; i++) {
//         for (let j = 0; j < fieldAllowed.length; j++) {
//           if (keyOf[i] === fieldAllowed[j]) {
//             receivedKey.push(keyOf[i]);
//             break;
//           }
//         }
//       }

//       if (keyOf.length !== receivedKey.length) {
//         res.status(400).send({ status: "fail", msg: "invalid" });
//       } else {
//         next();
//       }
//     }
//   } catch (error) {
//     console.log("in catch block", "++++++++++++++++++");
//     res.status(400).send({ status: "fail", msg: error.message });
//   }
// };

exports.blogCreation = (req, res, next) => {
  const fieldAllowed = [
    "title",
    "body",
    "author_Id",
    "tags",
    "category",
    "subcategory",
  ];
  const data = req.body;
  const keyOf = Object.keys(data);
  const receivedKey = fieldAllowed.filter((x) => !keyOf.includes(x));
  if (!receivedKey.length) {
    next();
  }
  if (receivedKey.length) {
    res
      .status(400)
      .send({ status: "fail", msg: `${receivedKey} field is missing` });
  }
};
exports.authorCreation = (req, res, next) => {
  const fieldAllowed = [
    "fname",
    "lname",
    "title",
    "email",
    "password"
    
  ];
  const data = req.body;
  const keyOf = Object.keys(data);
  const receivedKey = fieldAllowed.filter((x) => !keyOf.includes(x));

 if (!receivedKey.length) {
    next();
  }
  if (receivedKey.length) {
    res
      .status(400)
      .send({ status: "fail", msg: `${receivedKey} field is missing` });
  }
};

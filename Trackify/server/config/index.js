import mongoose from "mongoose"

function DBConnection(){
    mongoose.connect(
        'mongodb+srv://test:test@cluster0.wceurnf.mongodb.net/Trackify'
    ).then(() => console.log("We connected to DB 😉"))
    .catch((err) => console.log(err));
}

export default DBConnection
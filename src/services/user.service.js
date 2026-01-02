const { createUserInDB, getUserFromDB, deleteUserFromDBByEmail, updateUserInDB } = require('../db/index');

async function registerUser(payload) {
    //   const existing = await userRepo.findUserByEmail(payload.email);
    //   if (existing) throw new Error("User already exists");

    //   payload.password = await bcrypt.hash(payload.password, 10);
    try {
        const user = await createUserInDB(payload);
        return user;
    } catch (error) {
        throw (error);
    }
};

async function getUserByEmail(email) {
    //   const existing = await userRepo.findUserByEmail(payload.email);
    //   if (existing) throw new Error("User already exists");

    //   payload.password = await bcrypt.hash(payload.password, 10);
    try {
        const user = await getUserFromDB(email);
        return user;
    } catch (error) {
        throw (error);
    }
};

async function deleteUserByEmail(email) {
    //   const existing = await userRepo.findUserByEmail(payload.email);
    //   if (existing) throw new Error("User already exists");

    //   payload.password = await bcrypt.hash(payload.password, 10);
    try {
        const user = await deleteUserFromDBByEmail(email);
        return user;
    } catch (error) {
        throw (error);
    }
};

async function updateUserById(userId, data) {
    try {
        const user = await updateUserInDB(userId, data);
        return user;
    } catch (error) {
        throw (error);
    }
};

module.exports = { registerUser, getUserByEmail, deleteUserByEmail, updateUserById };
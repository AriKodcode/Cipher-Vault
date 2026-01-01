import express from 'express';
import 'dotenv/config';
import connectToMongoDB from '../connection/mongodbConnect.js';
import connectToSupebase from '../connection/supabaseConnect.js';
import check from '../middleware/createUser.js';
import checkUser from '../middleware/checkUser.js';
import { ObjectId } from 'bson';

const api = express();
const mongodb = await connectToMongoDB(
  process.env.URI_MONGODB,
  process.env.DB_NAME_MONGODB
);
const supabase = await connectToSupebase();
api.post('/auth/register', check, async (req, res) => {
  try {
    const newUser = await mongodb.collection('users').insertOne({
      username: req.body.username,
      password: req.body.password,
      encryptedMessagesCount: 0,
      createdAt: new Date().toISOString(),
    });
    res.status(201).json({
      id: new ObjectId(newUser[1]),
      username: req.body.username,
    });
  } catch (err) {
    console.error(err.message);
    res.send('ok');
  }
});

api.post('/messages/encrypt', checkUser, async (req, res) => {
  try {
    const userBody = req.body;
    const reversMessage = userBody.message.split('').reverse().join('');
    const upeprcaseMessage = reversMessage.toUpperCase();
    if (req.body && req.body.message && req.body.cipherType) {
      if (userBody.cipherType === 'reverse') {
        await supabase.from('messages').insert({
          username: req.headers.username,
          cipher_type: userBody.cipherType,
          encrypted_text: upeprcaseMessage,
        });
        await mongodb
          .collection('users')
          .updateOne(
            { username: req.headers.username },
            { $inc: { encryptedMessagesCount: 1 } }
          );
        const getId = await supabase
          .from('messages')
          .select()
          .order('id', { ascending: false })
          .limit(1);
        console.log(getId);

        res.status(201).json({
          id: getId.data[0].id,
          cipherType: req.body.cipherType,
          encryptedText: upeprcaseMessage,
        });
      }
    } else {
      res.status(404).send('missing field');
    }
  } catch (err) {
    console.error(err.message);
  }
});
api.post('/messages/decrypt', checkUser, async (req, res) => {
  try {
    const messageid = req.body.messageid;
    const encryptMessageArrey = await supabase
      .from('messages')
      .select()
      .eq('id', messageid);
    if (encryptMessageArrey.data.length > 0) {
      const encryptMessage = encryptMessageArrey.data[0].encrypted_text;
      if (encryptMessage !== null) {
        const lowercasemessage = encryptMessage.toLowerCase();
        const decryptMessage = lowercasemessage.split('').reverse().join('');
        res.status(200).json({
          id: messageid,
          decryptedText: decryptMessage,
        });
      }
    } else {
      res.status(404).send('id not found');
    }
  } catch (err) {
    console.error(err.message);
  }
});
api.get('/users/me', checkUser, async (req, res) => {
  try {
    const me = await mongodb
      .collection('users')
      .find({ username: req.headers.username })
      .toArray();
    res.status(200).json({
      username: me[0].username,
      encryptedMessagesCount: me[0].encryptedMessagesCount,
    });
  } catch (err) {
    console.error(err.message);
  }
});
export default api;

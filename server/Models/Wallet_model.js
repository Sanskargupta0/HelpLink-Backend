const mongoose  =  require('mongoose');

const WalletSchema = new mongoose.Schema({
    User_ID: {
        type: String,
        required: true
    },
    Balance: {
        type: Number,
        default: 0
    },
    Transactions: {
        type: Array,
        default: []
    }
});

const Wallet = mongoose.model('Wallet', WalletSchema);

module.exports = Wallet;
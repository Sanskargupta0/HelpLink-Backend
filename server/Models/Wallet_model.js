const mongoose  =  require('mongoose');

const WalletSchema = new mongoose.Schema({
    User_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
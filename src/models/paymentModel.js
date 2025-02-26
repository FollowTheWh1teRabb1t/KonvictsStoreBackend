const knex = require('../database'); // Conexão com o banco de dados

// Função para inserir um pagamento na tabela
exports.createPayment = async (items, payerEmail, amount) => {
    try {
        const [paymentId] = await knex('payments').insert({
            payerEmail: payerEmail,
            items: JSON.stringify(items), // Armazenar os itens como JSON
            amount: amount,
            status: 'Pendente',
        });

        return paymentId;
    } catch (error) {
        throw new Error('Erro ao criar pagamento no banco de dados');
    }
};

// Função para atualizar o status e o initPoint do pagamento
exports.updatePayment = async (paymentId, initPoint) => {
    try {
        await knex('payments')
            .where({ id: paymentId })
            .update({ initPoint, status: 'Pendente' }); // Atualiza o status também se necessário
    } catch (error) {
        throw new Error('Erro ao atualizar pagamento no banco de dados');
    }
};

// Função para obter um pagamento pelo ID
exports.getPaymentById = async (paymentId) => {
    try {
        const payment = await knex('payments').where({ id: paymentId }).first();
        return payment;
    } catch (error) {
        throw new Error('Erro ao obter pagamento do banco de dados');
    }
};

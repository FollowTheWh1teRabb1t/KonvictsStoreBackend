// src/services/mercadoPago.js

const mercadopago = require('mercadopago');

// Configuração do Mercado Pago com a credencial
mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_ACCESS_TOKEN);

module.exports = mercadopago;

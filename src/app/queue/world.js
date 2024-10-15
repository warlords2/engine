// RabbitMQ client
const amqp = require('amqplib');

// Configurações do RabbitMQ
const rabbitmqUrl = 'amqp://localhost'; // URL da conexão RabbitMQ
const queueName = 'world'; // Nome da fila

// Conectar ao RabbitMQ
const connection = await amqp.connect(rabbitmqUrl);
const channel = await connection.createChannel();

// Assegura que a fila existe
await channel.assertQueue(queueName, { durable: true });

// Configuração do tempo (em ms)
const gameCycleTime = 5000; // Tempo para executar o ciclo de vida do jogo (5 segundos)
const messageProcessingTime = 3000; // Tempo para processar mensagens do RabbitMQ (3 segundos)

module.exports.queue = async (world) => {
    try{
        const startTime = Date.now();

        // Continuar processando enquanto o tempo não for excedido
        while (Date.now() - startTime < processingTime) {
            const msg = await channel.get(queueName, { noAck: false }); // Recupera a mensagem, se houver

            if (msg) {
                
                const messageContent = msg.content.toString();
                console.log(`[x] Received message: ${messageContent}`);

                // Processar a mensagem aqui
                processMessage(messageContent);

                // Acknowledge da mensagem para removê-la da fila
                channel.ack(msg);
            } else {
                // Se não há mais mensagens, podemos esperar um tempo breve
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
        }
    }catch(error){}
    // Run province
    // Run city
    // Save state
}
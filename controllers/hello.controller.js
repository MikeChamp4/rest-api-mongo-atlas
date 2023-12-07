
function getHello(req, res){
    res.status(200).send({"message": "Hola Mundo!"})
}

module.exports = {
    getHello
}
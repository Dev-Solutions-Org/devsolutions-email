const nodemailer = require('nodemailer')
const { config } = require('../config')

const handleContact = async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json('Por favor, ingrese todos los campos.')
  }

  const content = `
    <p> Hola, DevSolutions. Alguien se ha puesto en contacto contigo mediante la página.</p>

    Nombre: ${name} <br />
    Correo: <b>${email}</b> <br />
    Mensaje: ${message}  <br />

    <p>Te recomendamos que respondas pronto. Feliz día.</p>
  `

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email,
      pass: config.password
    }
  })

  const mailOptions = {
    replyTo: email,
    from: `"${name}" <${config.email}>`,
    to: config.email,
    subject: `${name} se quiere poner en contacto contigo`,
    html: content
  }

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      res.json('Correo enviado con éxito.')
    }
  })
}

module.exports = {
  handleContact: handleContact
}

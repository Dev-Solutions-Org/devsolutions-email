const nodemailer = require('nodemailer')
const { config } = require('../config')

const handleContact = async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json('Por favor, ingrese todos los campos.')
  }

  const content = `<p>
    Hola, DevSolutions. Alguien se ha puesto en contacto contigo 
    mediante la página. <br/>

    Nombre: ${name} <br/>
    Correo: <b>${email}</b> <br/>
    Mensaje: ${message}  <br/>

    Te recomendamos que respondas pronto. Feliz día.

    </p>
  `


  const transporter = nodemailer.createTransport({
    host: 'smtp.migadu.com',
    port: 587,
    secure: false,
    auth: {
      user: config.email,
      pass: config.password
    }
  })

  const mailOptions = {
    replyTo: email,
    from: `"${name}" <${config.email}>`,
    to: 'devsolutionsbusiness@gmail.com',
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

const moment = require('moment')

function subset(date, arr) {
  let prob = Math.random()
  let sampled = []
  const len = (date.getDay() == 6) ? 20 : arr.length
  
  for (let i = 0; i < len; i++) {
    const r = Math.random()
    if (r < prob) 
      sampled.push(arr[i])
  }

  return sampled
}

const dayAppts = ["9:00 am", "9:15 am", "9:30 am", "9:45 am",
  "10:00 am", "10:15 am", "10:30 am", "10:45 am",
  "11:00 am", "11:15 am", "11:30 am", "11:45 am",
  "12:00 pm", "12:15 pm", "12:30 pm", "12:45 pm",
  "1:00 pm", "1:15 pm", "1:30 pm", "1:45 pm",
  "2:00 pm", "2:15 pm", "2:30 pm", "2:45 pm",
  "3:00 pm", "3:15 pm", "3:30 pm", "3:45 pm",
  "4:00 pm", "4:15 pm", "4:30 pm", "4:45 pm"
]

const generate = (req) => {
  console.log("req.body", req.body)
  return new Promise ((resolve, reject) => {
    const origin = req.get('origin')
    const doctorList = req.body.doctorList ? req.body.doctorList : []
    let startDate = new Date(req.body.startDate)
    const numDays = req.body.numDays
    const allDoctors = ["0001", "0002", "0003", "0004"]
    const doctors = doctorList.length === 0 ? allDoctors : doctorList
  
    // if (origin == process.env['AMCE_APP_HOST']) {
      let allSlots = []
      
      const genAppts4Doctor = (value, index, array) => {
        let drAppointments = {
          "bpId": value,
          "appointments": []
        }

        let curTick = startDate.getTime()
        for (let i = 0; i < numDays; i++) {
          let date = new Date(curTick)
          if (date.getDay() == 0) {
            curTick = date.getTime() + 86400000
            date = new Date(curTick)
          }
                    
          let oneDay = {
            "date": moment(date).format("YYYY-MM-DD"),
            "slots": subset(date, dayAppts)
          }
          
          drAppointments.appointments.push(oneDay)
          curTick = date.getTime() + 86400000
        }
        
        allSlots.push(drAppointments)
      }

      doctors.forEach(genAppts4Doctor)

      resolve(allSlots)
    // }
    // else {
    //   reject('Unknown domain')
    // }
  })
}

module.exports = {
  generate
}

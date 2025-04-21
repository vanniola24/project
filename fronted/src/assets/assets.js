import logo from '../../public/images/logo.jpeg'
import dropdown_icon from './dropdown_icon.jpeg'

import profile_pic from './profile_pic.jpeg'
import arrow_icon from './arrow_icon.jpeg'
import header_img from './header_img.jpg'

import appointment_img from './appointment_img.jpeg'
import contact_image from './contact_image.jpg'
 import menu_icon from './menu_icon.png'
import cross_icon from './cross_icon.jpeg'
//import profile_pic from './profile_pic.jpeg'

// import group_profiles from './group_profiles.png'

// import about_image from './about_image.jpg'


// import menu_icon from './menu_icon.png'

// import charts_icon from './charts_icon.svg.png'
import verified_icon from './verified_icon.png'

import info_icon from './info_icon.png'
// import upload_icon from './upload_icon.png'
// import stripe_logo from './stripe_logo.png'
// import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.jpg'
import doc2 from './doc2.jpg'
 import doc3 from './doc3.jpg'
 import doc4 from './doc4.jpg'
 import doc5 from './doc5.jpg'
 import doc6 from './doc6.jpg'
 import doc7 from './doc7.jpg'
 import doc8 from './doc8.jpg'
 import doc9 from './doc9.jpg'
 import doc10 from './doc10.jpg'
 import doc11 from './doc11.jpg'
 import doc12 from './doc12.jpg'
 import doc13 from './doc13.jpg'
 import doc14 from './doc14.jpg'
 import doc15 from './doc15.jpg'
 import docInfo from './docInfo.jpg'
 import Dermatologist from './Dermatologist.jpeg'
 import Gastroenterologist from './Gastroenterologist.jpeg'
import General_physician from './General_physician.jpeg'
 import Gynecologist from './Gynecologist.jpeg'
  import Neurologist from './Neurologist.jpeg'
 import Pediatricians from './Pediatricians.jpeg'


export const assets = {
    logo,
    dropdown_icon,
    profile_pic,
    arrow_icon,
    header_img,
    appointment_img,
    docInfo,
    contact_image,
    menu_icon,
    // group_profiles,
    // charts_icon,
    verified_icon,
    info_icon,
    
    
    contact_image,
    // about_image,
    // menu_icon,
    cross_icon,
   
    // upload_icon,
    // stripe_logo,
    // razorpay_logo
}

export const specialityData = [
    {
        id: 'doc1',
        speciality: 'General physician',
        image: General_physician
    },
    {
        id: 'doc2',
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        id: 'doc3',
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        id: 'doc6',
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        id: 'doc8',
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        id: 'doc10',
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },

]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Evans Kavita',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr, Evans has a strong committment to delivering comprehensive medical care, for the all the patient',
        fees:50,
        adress: {
            line1:'17th  street Eastleigh',
            line2:'14 section Madiwa'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Shutter Vanny',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr, Evans has a strong committment to delivering comprehensive medical care, for the all the patient',
        fees:45,
        adress: {
            line1:'17th  street Kerugoya',
            line2:'1 mango Utawala'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Keboi',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr, Evans has a strong committment to delivering comprehensive medical care, for the all the patient',
        fees:34,
        adress: {
            line1:'13 kasarani',
            line2:'45 Kawagware'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Ianoo',
        image: doc4,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr, Evans has a strong committment to delivering comprehensive medical care, for the all the patient',
        fees:30,
        adress: {
            line1:'17th  street Kerugoya',
            line2:'1 mango Utawala'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Vanny',
        image: doc5,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr, Evans has a strong committment to delivering comprehensive medical care, for the all the patient',
        fees:50,
        adress: {
            line1:'16th  Kerugoya',
            line2:'7 mango Utawala'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Kapuol',
        image: doc6,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr, Evans has a strong committment to delivering comprehensive medical care, for the all the patient',
        fees:46,
        adress: {
            line1:'moresco 42',
            line2:'16 kagemi'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. EDward',
        image: doc7,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '7 Years',
        about: 'Dr, Evans has a strong committment to delivering comprehensive medical care, for the all the patient',
        fees:58,
        adress: {
            line1:'37  kayole',
            line2:'3 Mamalucy'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Sparta oluoch',
        image:doc8,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr, Evans has a strong committment to delivering comprehensive medical care, for the all the patient',
        fees:29,
        adress: {
            line1:'3 machakos',
            line2:'5 level5'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr.Hadasa',
        image: doc9,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '6 Years',
        about: 'Dr, Evans has a strong committment to delivering comprehensive medical care, for the all the patient',
        fees:70,
        adress: {
            line1:'7 kangundo tala',
            line2:'17 Eastleigh'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. kelvin',
        image: doc1,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr, Evans has a strong committment to delivering comprehensive medical care, for the all the patient',
        fees:20,
        adress: {
            line1:'12 Kwamaji',
            line2:'1 Reverside'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Emily',
        image: doc11,
        speciality:'Gastroenterologist',
        degree: 'MBBS',
        experience: '8 Years',
        about: 'Dr, Evans has a strong committment to delivering comprehensive medical care, for the all the patient',
        fees:100,
        adress: {
            line1:'23 makaveti',
            line2:'1 kalama'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. cyrus',
        image: doc12,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '7 Years',
        about: 'Dr, Evans has a strong committment to delivering comprehensive medical care, for the all the patient',
        fees:80,
        adress: {
            line1:'17th  street Kerugoya',
            line2:'1 mango Utawala'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Kelly',
        image: doc13,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr, Evans has a strong committment to delivering comprehensive medical care, for the all the patient',
        fees:50,
        adress: {
            line1:'45 Embakasi',
            line2:'3 mapua Utawala'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Shutter Vanny',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr, Evans has a strong committment to delivering comprehensive medical care, for the all the patient',
        fees:46,
        adress: {
            line1:'17 kiambu',
            line2:'56 thika'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Shutter',
        image: doc15,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr, Evans has a strong committment to delivering comprehensive medical care, for the all the patient',
        fees:87,
        adress: {
            line1:'2 Ngara',
            line2:'1 kilimani'
        }
    },
    
]

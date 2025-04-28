// /data/hoteles.js

export const hoteles = [
    {
      id: 1,
      name: 'Hotel Casa Madero',
      location: 'Centro Histórico',
      phone: '+52 443 123 4567',
      description: 'Un hotel boutique ubicado en el corazón de Morelia, ideal para descansar y explorar el centro.',
      imagenes: [
        require('../assets/catedral.jpeg'),
        require('../assets/catedral.jpeg'),
        require('../assets/catedral.jpeg'),
      ],
      rooms: [
        {
          id: 1,
          title: 'Suite Presidencial',
          capacity: 4,
          price: 1499,
          features: ['WiFi', 'Aire Acond', 'Jacuzzi', 'TV Smart'],
        },
      ],
    },
    {
      id: 2,
      name: 'Hotel Catedral',
      location: 'Zona Catedral',
      phone: '+52 443 456 7890',
      description: 'Con una vista privilegiada frente a la Catedral, este hotel ofrece lujo y tradición.',
      imagenes: [
        require('../assets/catedral.jpeg'),
        require('../assets/catedral.jpeg'),
      ],
      rooms: [
        {
          id: 2,
          title: 'Habitación Doble',
          capacity: 2,
          price: 899,
          features: ['WiFi', '2 camas', 'Desayuno incluido'],
        },
      ],
    },
    {
      id: 3,
      name: 'Hotel Boutique Altozano',
      location: 'Altozano',
      phone: '+52 443 321 6540',
      description: 'Moderno y exclusivo, con una vista espectacular y servicios premium.',
      imagenes: [
        require('../assets/catedral.jpeg'),
        require('../assets/catedral.jpeg'),
      ],
      rooms: [
        {
          id: 3,
          title: 'Suite Panorámica',
          capacity: 3,
          price: 1199,
          features: ['Vista panorámica', 'WiFi', 'Mini bar', 'TV Smart'],
        },
      ],
    },
  ];
  
export const filterValuesDefault = {

    frontFenderLength: {
        values: { from: 5, to: 25 },
    },

    color: {
        values: {
            options: [
                { id: 10, name: 'Red' },
                { id: 15, name: 'Orange' },
                { id: 20, name: 'Yellow' },
                { id: 25, name: 'Green' },
                { id: 35, name: 'Blue' },
                { id: 45, name: 'Brown/Gray/Black' },
            ]
        }
    },
    squad: {
        values: {
            options: [
                { name: 'Archaeognatha' },
                { name: 'Blattodea' },
                { name: 'Coleoptera' },
                { name: 'Dermaptera' },
                { name: 'Diptera' },
                { name: 'Embioptera' },
                { name: 'Ephemeroptera' },
                { name: 'Grylloblattodea' },
                { name: 'Hemiptera' },
                { name: 'Hymenoptera' },
                { name: 'Lepidoptera' },
                { name: 'Mantodea' },
                { name: 'Mantophasmatodea' },
                { name: 'Mecoptera' },
                { name: 'Megaloptera' },
                { name: 'Neuroptera' },
                { name: 'Odonata' },
                { name: 'Orthoptera' },
                { name: 'Phasmida' },
                { name: 'Plecoptera' },
                { name: 'Psocodea' },
                { name: 'Raphidioptera' },
                { name: 'Siphonaptera' },
                { name: 'Strepsiptera' },
                { name: 'Thysanoptera' },
                { name: 'Trichoptera' },
                { name: 'Zoraptera' },
                { name: 'Zygentoma' }
            ]
        }
    },
    summerTime: {
        values: { from: 5, to: 25 },
    },
    photo: {
        values: [true, false],
    },
    imageSize: {
        values: ['small', 'big'],
    },
    typeOfIllustrations: {
        values: {
            options: [
                { name: 'Популярности' },
                { name: 'Год описания' },
                { name: 'Названию' }
            ]
        },
    },
    sortBy: {
        values: {
            options: [
                { name: 'Время обновления' },
                { name: 'Популярности' },
                { name: 'Год описания' },
                { name: 'Названию' }
            ]
        },
    }

}
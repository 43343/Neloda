const Discord = require('discord.js');
module.exports = function hare(client, mess, args, systemColor) {
    const massiveArrayImage = ["https://www.konnecthq.com/wp-content/uploads/2019/07/Hare-1-10-1-758x635.jpg", "https://a-z-animals.com/media/hare-3.jpg",
        "https://a-z-animals.com/media/animals/images/original/hare8.jpg", "https://a-z-animals.com/media/hare-1.jpg",
        "https://i.guim.co.uk/img/media/7f03da2c34da2dfc9dcf49a3dd210d462a45225b/0_140_3543_2126/master/3543.jpg?width=620&quality=85&auto=format&fit=max&s=dc4c0dc2889b0a62c50053ee1e301a92",
        "https://images.immediate.co.uk/production/volatile/sites/23/2018/04/GettyImages-154317449-aa39a8b.jpg?webp=true&quality=90&crop=424px%2C166px%2C4395px%2C2928px&resize=408%2C271",
        "https://www.norfolkwildlifetrust.org.uk/getmedia/f9161bd8-55ae-463d-9948-51122c107e8d/Brown-hare,-Sculthorpe-Moor-Nature-Reserve,-Richard-Brunton,-19-December-2014-(Small).jpg.aspx?width=762",
        "https://www.norfolkwildlifetrust.org.uk/getmedia/4bc2a9dc-cd3f-40f6-a9fa-55662cd2bf98/Brown_hare_Welney_Wetlands_Don_Cuddon_13_02_2020-(Small).aspx",
        "https://www.norfolkwildlifetrust.org.uk/getmedia/9bb0a9a9-e296-4753-9d0f-449c00a1fc75/Hare,-Abbey-Farm,-Alex-McLennan,-26-March-2012-(Custom).jpg.aspx?width=762",
        "https://artandpictures.nl/wp-content/uploads/2018/05/Nicky-3-of-1-600x337.jpg", "https://p0.pikist.com/photos/712/476/bunny-rabbit-spring-baby-bunny-baby-rabbit-easter-hare-animal-cute.jpg",
        "https://www.telegraph.co.uk/content/dam/news/2021/03/17/TELEMMGLPICT000253560880_trans_NvBQzQNjv4BqjzIcfc31ora240WaI2M-kPNJitopqSL0dCdiYeBJa20.jpeg?imwidth=960",
        "https://static.wixstatic.com/media/fe5dca_1ed200c8b2534684bb6597a6af19b84a.jpg/v1/fill/w_367,h_304,al_c,q_80,usm_0.66_1.00_0.01/fe5dca_1ed200c8b2534684bb6597a6af19b84a.webp",
        "https://images.immediate.co.uk/production/volatile/sites/22/2020/06/Mountain-hare-GettyImages-1187886827-844efca-scaled.jpg?webp=true&quality=90&resize=620%2C413",
        "https://images.immediate.co.uk/production/volatile/sites/22/2020/06/Mountain-hare-resting-in-moorland-GettyImages-1184724646-a1a2033-scaled.jpg?webp=true&quality=90&resize=619%2C413",
        "https://images.immediate.co.uk/production/volatile/sites/22/2020/06/Mountain-hare-in-snow-GettyImages-1135513015-7da99ab-scaled.jpg?quality=90&resize=960%2C640",
        "https://www.nature.scot/sites/default/files/styles/hero_banner_half_width/public/2021-03/M-Hare-D9582_jpg_JPEG%20Image%20Height%20720px_m31186.jpg?itok=Nn7vC2KI",
        "https://assets.change.org/photos/2/tr/tp/fdtRTpFaJDPsIkh-800x450-noPad.jpg?1508937559",
        "https://images.immediate.co.uk/production/volatile/sites/22/2020/06/Mountain-hare-with-white-winter-coat-GettyImages-903112538-948d0d9-scaled.jpg?quality=90&resize=960%2C687",
        "https://www.aiwc.ca/wp-content/uploads/2016/09/Baby-hare.jpg", "https://storage.googleapis.com/oceanwide_web/media-dynamic/cache/list_photo_progressive/media/default/0001/05/41bfcd0afacc650bdac09b425dbe91e37b4cd365.jpeg",
        "https://storage.googleapis.com/oceanwide_web/media-dynamic/cache/list_photo_progressive/media/default/0001/05/db1f331bbcaad55612702fbbd00825730976afe3.jpeg",
        "https://images.cm.archant.co.uk/resource/responsive-image/6965314/article-lead-image/lg/1/exg-mar-15-wild-about-haverga-b2785c5c.jpg",
        "http://www.adfg.alaska.gov/static/species/speciesinfo/snowshoehare/images/snowshoehare_boards.jpg",
        "https://images.immediate.co.uk/production/volatile/sites/22/2018/09/GettyImages-505479604-faac529.jpg?webp=true&quality=90&resize=620%2C409",
        "https://images.immediate.co.uk/production/volatile/sites/22/2018/09/GettyImages-692782053-4119c6b.jpg?webp=true&quality=90&resize=619%2C413",
        "http://greglasley.com/images/Mammals/Snowshoe1a.jpg", "http://greglasley.com/images/Mammals/Snowshoe%20Hare%200002.jpg"];
    const embed = new Discord.MessageEmbed()
    .setImage(massiveArrayImage[Math.floor(Math.random() * massiveArrayImage.length)])
    .setColor(systemColor);
    mess.channel.send({embeds:[embed]});
}
const Discord = require('discord.js');
module.exports = function wolf(client, mess, args, systemColor) {
    const massiveArrayImage = ["https://vsezhivoe.ru/wp-content/uploads/2017/09/20.jpg","https://funik.ru/wp-content/uploads/2018/11/3775daf26943d820d481.jpg",
    "https://top10a.ru/wp-content/uploads/2020/01/9-92-2048x1463.jpg","http://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1RkbcT03bCnj2gtSAJv9mOmUqaKTM5SRkZCeTgDn6uOyic",
    "https://web-zoopark.ru/wp-content/uploads/2018/07/3-147.jpg","https://www.kleo.ru/img/articles/-07-02-2021-195114.jpg",
    "https://i.pinimg.com/originals/ef/bc/b7/efbcb71983a55f22a07ab68b692324f5.jpg","https://i.pinimg.com/736x/43/61/4e/43614ef578929dbb939745b414b94389.jpg",
    "http://komiwiki.syktsu.ru/images/f/f6/Волк.jpg","https://vistapointe.net/images/gray-wolf-8.jpg",
    "https://fotovmire.ru/wp-content/uploads/2019/01/5381/portret-krupnogo-volka-na-fone-snega.jpg","https://i.pinimg.com/originals/d1/91/7f/d1917f599be1e914dfbc6796c8102d74.jpg",
    "https://cdn.pixabay.com/photo/2016/08/10/13/34/wolf-1583200_1280.jpg","https://i.pinimg.com/originals/89/fe/a9/89fea9e83e1b88e65d3c0dc0da182104.jpg",
    "https://ohotasaratov.ru/wp-content/uploads/2019/05/wolf-1504409_1280.jpg","https://attuale.ru/wp-content/uploads/2018/11/gray-wolf-oregon-delisting-1220x811.jpg",
    "https://avatars.mds.yandex.net/get-zen_doc/3453969/pub_5f1749aa2b4b755a9bc55263_5f204415426df009ea4ae338/scale_1200","https://funik.ru/wp-content/uploads/2018/11/504cbccbef3fe5a08e9c.jpg",
    "https://cdn.pixabay.com/photo/2016/07/13/15/45/wolf-1514782_1280.jpg","https://img3.goodfon.ru/wallpaper/nbig/7/88/wolf-volk-seryy-hischnik.jpg",
    "https://i.pinimg.com/originals/53/5e/d0/535ed041455030e7bcb581e187171daf.jpg","https://animalreader.ru/wp-content/uploads/2014/10/VuzHM-e1413888543329.jpg",
    "https://zeleniymir.org/wp-content/uploads/2019/04/Volk-118-1024x768.jpg","https://media.krasota.ru/filer_public/09/35/093591e9-d868-49b0-aca9-16f7d87494e5/seryi_obyknovennyi_volk.jpg",
    "https://zagadki-dlya-detej.ru/wp-content/uploads/2020/06/volk.jpg","https://i.pinimg.com/originals/e1/0f/42/e10f4281d5b1e580269714f1cd7eefec.jpg",
    "https://www.vladtime.ru/uploads/posts/2016-02/1456322854_1.jpg","https://i.pinimg.com/originals/79/4f/9c/794f9cf2e42fb2b9c9d7823b55b337b9.jpg",
    "https://avatars.mds.yandex.net/get-zen_doc/3665883/pub_60664d67fd6ae15849df5124_606651ea9f06e15305a151c6/scale_1200","https://pic.xenomorph.ru/2015-06/1433427889_wf2.jpg",
    "https://img3.goodfon.ru/wallpaper/nbig/9/2b/volk-hischnik-morda-glaza-vzglyad.jpg","https://wallpaperscave.ru/images/original/18/10-13/animals-wolves-91629.jpg",
    "https://i.pinimg.com/736x/4f/1f/4c/4f1f4c67a49e7dff394f554403885fb1.jpg","https://wallpaperscave.ru/images/original/18/09-18/animals-wolves-85145.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/5/5a/Canis_lupus_265b.jpg","https://wildfrontier.ru/wp-content/uploads/2016/01/Volk23.jpg",
    "https://s1.1zoom.ru/b5050/758/Wolves_461952_1920x1200.jpg","https://i.pinimg.com/736x/c4/41/d3/c441d3e811b9c76795dc2a8ea51dc9e5.jpg",
    "https://avatars.mds.yandex.net/get-zen_doc/1872259/pub_5d9b4049fc69ab00ada58b3c_5d9b476c98fe7900b0e4ff01/scale_1200","https://get.wallhere.com/photo/dog-wolf-Alaskan-Malamute-mammal-vertebrate-wolfdog-saarloos-wolfdog-dog-like-mammal-dog-breed-group-greenland-dog-carnivoran-dog-crossbreeds-dog-breed-czechoslovakian-wolfdog-canis-lupus-tundrarum-east-siberian-laika-west-siberian-laika-eurasier-100556.jpg",
    "https://fotovmire.ru/wp-content/uploads/2019/01/5381/volk-zamer-pod-derevom-i-smotrit-v-kadr-na-fone-zeljonogo-lesa.jpg","https://i.pinimg.com/736x/9a/05/e6/9a05e677685a6acf4ca7e0f76c0d66c7--grey-wolves-gray-wolf.jpg",
    "https://w-dog.ru/wallpapers/0/57/323919629673253/meksikanskij-volk-v-meksike-volki-est.jpg","https://i.pinimg.com/originals/1b/05/be/1b05be12e39eaa2a16f598ea4f446a0b.jpg",
    "https://i.pinimg.com/originals/2a/08/2a/2a082a1fbf7afe3093ae1bba7f5c0da5.jpg","https://img4.goodfon.ru/wallpaper/nbig/a/89/volk-seryi-morda-sherst.jpg",
    "https://vistapointe.net/images/wolf-10.jpg","https://cdn.pixabay.com/photo/2018/02/13/23/46/wolf-3151876_1280.jpg",
    "https://avatars.mds.yandex.net/get-zen_doc/1594475/pub_5cbf07d220749800b5aef658_5cbf0e1920749800b5aef6f5/scale_1200","https://avatars.mds.yandex.net/get-zen_doc/1594475/pub_5cbf07d220749800b5aef658_5cbf0e1920749800b5aef6f5/scale_1200",
    "https://avatarko.ru/img/kartinka/33/volk_zhivotnye_33353.jpg","https://i.pinimg.com/originals/78/72/d2/7872d28c2ad3fecfd22d46dd5d046bfb.jpg",
    "https://img1.goodfon.ru/wallpaper/nbig/8/e9/volk-hischnik-morda-vzglyad.jpg","https://tayniymir.com/wp-content/uploads/2019/04/sonnik-volk.jpg",
    "https://funik.ru/wp-content/uploads/2018/11/d7b12b29f5bc85104883.jpg","https://cdn.fishki.net/upload/post/201502/05/1415680/8807378vi7.jpg",
    "https://vmo24.ru/files/news/news_50108.jpg","https://wallpaperscave.ru/images/original/18/10-24/animals-wolves-94171.jpg",
    "https://cutewallpaper.org/21/wolf-desktop/Desktop-Gray-Wolf-Wallpapers-Dowload-Grey-Wolves-High-.jpg","https://i.pinimg.com/originals/87/60/64/876064e48efb74101ef2023e910587d2.jpg",
    "https://wallpaperscave.ru/images/original/18/08-20/animals-wolves-77448.jpg","https://wallpaperscave.ru/images/original/18/01-16/animals-wolves-10864.jpg",
    "https://i.pinimg.com/originals/ec/b0/78/ecb0784010f88f37438f59379b6ba495.jpg","https://i.pinimg.com/736x/9e/dc/a6/9edca6e83ad0e42bcdf83546e185d242.jpg",
    "https://funik.ru/wp-content/uploads/2018/11/9c0e59c96a5599189e03.jpg","https://www.newsler.ru/data/content/2018/72201/fc3369b81fe197ab9451c715ecbbb216.jpg",
    "https://floranimal.ru/upload/iblock/14d/14d12a4311f8a522fc4aeceef77a20a3.jpg","https://cdn.fishki.net/upload/post/2019/09/13/3084540/original.jpg",
    "https://i.pinimg.com/originals/d3/9b/06/d39b065a56fc07497a121a735af9e5fb.jpg","http://tv-karelia.ru/wp-content/uploads/2019/10/d45caae8daa0956a3a2f6009ab2978f5.jpg",
    "https://photocentra.ru/images/main31/315436_main.jpg","https://i.artfile.ru/1940x1292_689867_[www.ArtFile.ru].jpg",
    "https://i.pinimg.com/originals/3b/ff/c2/3bffc22adb4e1ce90e6811e515d6c13d.jpg","https://assets.bwbx.io/images/users/iqjWHBFdfxIU/irmbm7gf2kYg/v1/1200x800.jpg",
    "https://avatars.mds.yandex.net/get-zen_doc/3481765/pub_5ed1156bd148e7005aa4b9f3_5ed115fe32c54f23eeada001/scale_1200","https://pbs.twimg.com/media/D3cru7tXsAEAzQU.jpg:large",
    "https://avatars.mds.yandex.net/get-zen_doc/3990034/pub_5fa7d7c18eb5b23a30e2ac7d_5fa7d8dbb1fbcf2e2339b044/scale_1200","https://wallpaperscave.ru/images/original/18/09-04/animals-wolves-81536.jpg",
    "https://img4.goodfon.ru/wallpaper/nbig/1/6c/volk-vzgliad-glaza-sherst.jpg","https://i.pinimg.com/originals/c5/5a/6e/c55a6eb972d091baf7ef4b0fb89aeab0.jpg",
    "https://www.desktopbackground.org/download/1152x864/2015/05/13/947646_black-wolf_1920x1080_h.jpg","https://wallpaperscave.ru/images/original/18/09-22/animals-wolves-86115.jpg",
    "https://funart.pro/uploads/posts/2021-04/thumbs/1618142297_40-p-yevraziiskii-volk-zhivotnie-krasivo-foto-45.jpg","https://i.artfile.ru/1920x1275_795864_[www.ArtFile.ru].jpg",
    "https://sib100.ru/wp-content/uploads/2019/09/Sibirskiy-Volk-1.jpg","https://i.pinimg.com/originals/33/86/d3/3386d372202c0012322a6c008a79ac6d.jpg",
    "https://ds05.infourok.ru/uploads/ex/0504/0017e64b-2728712e/hello_html_m4dbd9cc6.jpg","https://avatars.mds.yandex.net/get-zen_doc/61319/pub_5cd518bc849658051f766a5d_5cd51dbb5a6e0400b34f3540/scale_1200",
    "https://images.wallpaperscraft.ru/image/volk_khishchnik_morda_117377_1920x1080.jpg","https://i.pinimg.com/originals/c3/ab/67/c3ab670e00bc4d1ed9bfba76d04c486e.jpg",
    "https://xida.ru/sites/default/files/art-file/image_xida070420_6410.jpg","https://www.sunhome.ru/i/foto/8/stepnoi_volk.orig.jpg",
    "https://i.pinimg.com/originals/d2/2b/c7/d22bc77efb48ba5c4b1d772cc50ae49a.jpg","https://townsquare.media/site/67/files/2018/11/Gray-Wolf.jpg?w=1200&h=0&zc=1&s=0&a=t&q=89",
    "https://images.wallpaperscraft.ru/image/volk_sobaka_hishchnik_126082_1920x1080.jpg","https://cdn.pixabay.com/photo/2016/04/14/17/00/wolf-1329264_1280.jpg"];
    const embed = new Discord.MessageEmbed()
    .setImage(massiveArrayImage[Math.floor(Math.random() * massiveArrayImage.length)])
    .setColor(systemColor);
    mess.channel.send({embeds:[embed]});
}
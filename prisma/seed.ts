const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const food = await prisma.category.upsert({
    where: { id: '1' },
    update: {},
    create: { id: '1', name: 'Хоол' },
  });

  const data = [
    {
      name: 'Modern Nomads',
      description: 'Монгол үндэсний хоолны сүлжээ ресторан',
      address: 'УБ, СБД, 1-р хороо',
      phone: '99112233',
      email: 'info@modernnomads.mn',
      website: 'https://modernnomads.mn',
      location: 'Улаанбаатар',
      facebookUrl: 'https://facebook.com/modernnomads',
      instagramUrl: 'https://instagram.com/modernnomads',
      timetable: '10:00–22:00',
    },
    {
      name: 'BD’s Mongolian BBQ',
      description: 'Mongolian grill стильтэй ресторан',
      address: 'УБ, ХУД, Чингисийн өргөн чөлөө',
      phone: '99001122',
      email: 'info@bdsmongolia.mn',
      website: 'https://bdsmongolia.mn',
      location: 'Улаанбаатар',
      facebookUrl: 'https://facebook.com/bdsmongolia',
      instagramUrl: 'https://instagram.com/bdsmongolia',
      timetable: '11:00–23:00',
    },
    {
      name: 'Khaan Deli',
      description: 'Барууны болон Монгол хоолны ресторан',
      address: 'УБ, БГД, 4-р хороо, Энхтайваны өргөн чөлөө',
      phone: '99115566',
      email: 'contact@khaandeli.mn',
      website: 'https://khaandeli.mn',
      location: 'Улаанбаатар',
      facebookUrl: 'https://facebook.com/khaandeli',
      instagramUrl: 'https://instagram.com/khaandeli',
      timetable: '09:00–22:00',
    },
    {
      name: 'Terelj Lodge',
      description: 'Жуулчны бааз, Монгол хоол, амралт зугаа',
      address: 'Тэрэлж, Газарчны хөндий',
      phone: '99554433',
      email: 'info@tereljlodge.mn',
      website: 'https://tereljlodge.mn',
      location: 'Тэрэлж',
      facebookUrl: 'https://facebook.com/tereljlodge',
      instagramUrl: 'https://instagram.com/tereljlodge',
      timetable: '09:00–21:00',
    },
    {
      name: 'Veranda Restaurant',
      description: 'Европ хоолны ресторан, үзэгдэх орчин сайтай',
      address: 'УБ, СБД, 1-р хороо, Central Tower',
      phone: '77337733',
      email: 'info@veranda.mn',
      website: 'https://veranda.mn',
      location: 'Улаанбаатар',
      facebookUrl: 'https://facebook.com/verandamn',
      instagramUrl: 'https://instagram.com/verandamn',
      timetable: '10:00–23:00',
    },
    {
      name: 'Korean House',
      description: 'Солонгос үндэсний хоолны газар',
      address: 'УБ, ХУД, 15-р хороо, Seoul Street',
      phone: '99229922',
      email: 'khouse@seoul.mn',
      website: 'https://koreanhouse.mn',
      location: 'Улаанбаатар',
      facebookUrl: 'https://facebook.com/koreanhousemn',
      instagramUrl: 'https://instagram.com/koreanhousemn',
      timetable: '11:00–22:00',
    },
    {
      name: 'Sakura Sushi',
      description: 'Япон хоолны сүлжээ ресторан',
      address: 'УБ, СБД, 6-р хороо, Peace Avenue',
      phone: '99334455',
      email: 'sakura@sushi.mn',
      website: 'https://sushisakura.mn',
      location: 'Улаанбаатар',
      facebookUrl: 'https://facebook.com/sushisakura',
      instagramUrl: 'https://instagram.com/sushisakura',
      timetable: '10:00–22:00',
    },
    {
      name: 'The Bull Hotpot',
      description: 'Хятад халуун тогооны ресторан',
      address: 'УБ, БЗД, Нарны зам',
      phone: '99776655',
      email: 'bull@hotpot.mn',
      website: 'https://bullhotpot.mn',
      location: 'Улаанбаатар',
      facebookUrl: 'https://facebook.com/bullhotpot',
      instagramUrl: 'https://instagram.com/bullhotpot',
      timetable: '11:00–23:30',
    },
    {
      name: 'PizzaHut Mongolia',
      description: 'Пицца, паста, шарсан хоолны газар',
      address: 'УБ, БГД, Max Mall дотор',
      phone: '77007700',
      email: 'info@pizzahut.mn',
      website: 'https://pizzahut.mn',
      location: 'Улаанбаатар',
      facebookUrl: 'https://facebook.com/pizzahutmn',
      instagramUrl: 'https://instagram.com/pizzahutmn',
      timetable: '10:00–22:00',
    },
    {
      name: 'Silk Road Tea House',
      description: 'Цайны газар, соёлын уур амьсгалтай кафе',
      address: 'УБ, СБД, 7-р хороо, State Department Store орчим',
      phone: '88118811',
      email: 'silkroad@tea.mn',
      website: 'https://silkroadtea.mn',
      location: 'Улаанбаатар',
      facebookUrl: 'https://facebook.com/silkroadtea',
      instagramUrl: 'https://instagram.com/silkroadtea',
      timetable: '09:00–22:00',
    },
  ];

  for (const b of data) {
    await prisma.business.create({ data: { ...b, categoryId: food.id } });
  }
}

main()
  .then(() => console.log('Cmooon 10 business'))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

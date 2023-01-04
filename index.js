var request = require("request");
var { google } = require("googleapis");
var key = require("./service-account.json"); // grab the key from https://console.cloud.google.com/iam-admin/serviceaccounts/details/113716060516384395997?project=fine-program-373700


const urls = [
  "https://sabiinsight.beehiiv.com/login",
  "https://invisiblehand.beehiiv.com/login",
  "https://morninghuddle.beehiiv.com/login",
  "https://kinsey.beehiiv.com/p/wanna-something-fun",
  "https://mindsetmonday.beehiiv.com/p/mindset-monday-abundance-mindset",
  "https://timetoship.beehiiv.com/p/im-gettin-automated",
  "https://piqueaction.beehiiv.com/p/pique-behind-curtain-vol-27",
  "https://outsiders.beehiiv.com/",
  "https://allintext.beehiiv.com/",
  "https://web3pills.beehiiv.com/",
  "https://bullishrippers.beehiiv.com/p/rippers-weekly-recap-2022-09-17",
  "https://confluencevcweekly.beehiiv.com/p/jay-drain-jr-associate-maven-ventures",
  "https://timstripleplay.beehiiv.com/",
  "https://thealbatross.beehiiv.com/subscribe",
  "https://morninghuddle.beehiiv.com/p/preseason-week-1-risers-fallers",
  "https://ntfd.beehiiv.com/p/shake-shack-shakers-more",
  "https://thefmally.beehiiv.com/",
  "https://michael.beehiiv.com/",
  "https://kings-beat.beehiiv.com/p/sunday-musings-six-key-questions-heading-kings-training-camp",
  "http://nikfuller.beehiiv.com/?q=%7Bsearch_term_string%7D?q=%7Bsearch_term_string%7D",
  "https://heep.beehiiv.com/p/showcase-heep-a2e7",
  "https://kings-beat.beehiiv.com/p/kings-training-camp-roster-set-addition-kent-bazemore-quinn-cook",
  "http://sandboxboy.beehiiv.com/",
  "https://thedrop.beehiiv.com/p/bill-gates-hates-crypto",
  "https://piqueaction.beehiiv.com/p/pique-behind-curtain-vol-32",
  "https://rosegardenreport.beehiiv.com/p/nassir-little-working-rust-off-small-forward-battle-heats",
  "https://piqueaction.beehiiv.com/p/pique-behind-curtain-vol-4",
  "https://overnightsuccesses.beehiiv.com/p/9th-july-weekly-retro-australian-startups-venture-capital",
  "https://whileyouwereaway.beehiiv.com/p/away-april-17-2022",
  "https://execsum.beehiiv.com/p/liraquidity",
  "https://vempire-weekly.beehiiv.com/",
  "https://publicintegrity-newsletter.beehiiv.com/",
  "https://m3tamag.beehiiv.com/subscribe",
  "https://enjoybasketball.beehiiv.com/p/potential-nba-draftday-trades-kenny-atkinson-ditches-hornets",
  "http://ucsb-investconnect-newsletter.beehiiv.com/p/welcome-back-gauchos-1e57",
  "https://funnelkafasi.beehiiv.com/p/urun-gercekligi",
  "https://kings-beat.beehiiv.com/p/kings-head-las-vegas-looking-second-straight-summer-league-title",
  "https://parallax.beehiiv.com/",
  "https://goinvest.beehiiv.com/",
  "https://piqueaction.beehiiv.com/p/pique-behind-curtain-vol-8",
  "https://blog.beehiiv.com/p/case-study-female-founder-world-jasmine-garnsworthy",
  "https://kings-beat.beehiiv.com/p/kings-beat-mock-draft-10",
  "https://zencel.beehiiv.com/",
  "https://voicedao.beehiiv.com/p/300k-worth-web3-jobs-top-3-latest-web3-news",
  "https://homescreen.beehiiv.com/p/elon-says-no-twitter",
  "https://theurbandoomer.beehiiv.com/",
  "https://thevigcompany-v2.beehiiv.com/p/v2-model-update-may-16th",
  "https://thevigcompany-v2.beehiiv.com/p/v2-model-update-may-23",
  "https://thevigcompany-v2.beehiiv.com/p/v2-model-june-21-update",
  "https://morninghuddle.beehiiv.com/p/run-forrest-run",
  "https://morninghuddle.beehiiv.com/p/mac-fing-jones",
  "https://dr-parik-patel.beehiiv.com/p/want-become-billionaire-take-tip-binances-cz-zhao",
  "https://highyieldharry.beehiiv.com/p/reflecting-20202021-investing-bubble",
  "https://funnelkafasi.beehiiv.com/p/imize-bir-sistem-olarak-bakabilmek",
  "https://lis-vilas-boas.beehiiv.com/",
  "https://publishpress.beehiiv.com/p/cashapp-giving-artists-free-money",
  "https://securitypills.beehiiv.com/p/security-pills-issue-1-b333",
  "https://bencasey.beehiiv.com/p/australian-medication-shortages-for-pharmacists-19-9-22",
  "https://bencasey.beehiiv.com/p/therobotsarecomingtopharmacy",
  "https://glocalisthk.beehiiv.com/p/22",
  "https://thevigcompany-v2.beehiiv.com/p/v2-model-october-2-2021-update",
  "https://thevigcompany-v2.beehiiv.com/p/v2-model-november-21-2020-update",
  "https://thevigcompany-v2.beehiiv.com/p/v2-model-january-29-2021-change",
  "https://thevigcompany-v2.beehiiv.com/p/v2-model-june-19-2021-update-change",
  "https://spactrack.beehiiv.com/p/precap-spac-track-7920",
  "https://mewantfaatdaat.beehiiv.com/p/5d5c0474-597e-439e-8ac2-7938a4398e75",
  "https://lolamure78.beehiiv.com/p/estoy-de-vuelta-y-se-vienen-cambios"
]
const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ["https://www.googleapis.com/auth/indexing"],
  null
);

jwtClient.authorize(function(err, tokens) {
  if (err) {
    console.log(err);
    return;
  }
  urls.forEach(url => {
    let options = {
      url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
      method: "POST",
      // Your options, which must include the Content-Type and auth headers
      headers: {
        "Content-Type": "application/json"
      },
      auth: { "bearer": tokens.access_token },
      // Define contents here. The structure of the content is described in the next step.
      json: {
        "url": url,
        "type": "URL_UPDATED"
      }
    };
    request(options, function (error, response, body) {
      // Handle the response
      console.log(body);
    });
  })



});


from datetime import datetime
from zoneinfo import ZoneInfo

from panchang import Location
from panchang.panchang import compute
from panchang.panchang import get_engine
from panchang.core.ephemeris import Planet


LOCATION = Location(
    lat=17.385,
    lng=78.4867,
    tz="Asia/Kolkata"
)


# ==========================
# Telugu Maps
# ==========================


TELUGU_NAMES = {

    # Samvatsaram
    "Parabhava": "పరాభవ",


    # Maasam
    "Chaitra": "చైత్ర",
    "Vaiśākha": "వైశాఖ",
    "Jyeṣṭha": "జ్యేష్ఠ",
    "Āṣāḍha": "ఆషాఢ",
    "Śrāvaṇa": "శ్రావణ",
    "Bhādrapada": "భాద్రపద",
    "Āśvayuja": "ఆశ్వయుజ",
    "Kārtika": "కార్తీక",
    "Mārgaśīrṣa": "మార్గశిర",
    "Pauṣa": "పుష్య",
    "Māgha": "మాఘ",
    "Phālguna": "ఫాల్గుణ",


    # Nakshatram

    "Aśvinī": "అశ్విని",
    "Bharaṇī": "భరణి",
    "Kṛttikā": "కృత్తిక",
    "Rohiṇī": "రోహిణి",
    "Mṛgaśīrṣa": "మృగశిర",
    "Ārdrā": "ఆర్ద్ర",
    "Punarvasu": "పునర్వసు",
    "Puṣya": "పుష్యమి",
    "Āśleṣā": "ఆశ్లేష",
    "Maghā": "మఖ",
    "Pūrvaphalgunī": "పుబ్బ",
    "Uttaraphalgunī": "ఉత్తర",
    "Hasta": "హస్త",
    "Citrā": "చిత్త",
    "Svātī": "స్వాతి",
    "Viśākhā": "విశాఖ",
    "Anurādhā": "అనూరాధ",
    "Jyeṣṭhā": "జ్యేష్ఠ",
    "Mūla": "మూల",
    "Pūrvāṣāḍhā": "పూర్వాషాఢ",
    "Uttarāṣāḍhā": "ఉత్తరాషాఢ",
    "Śravaṇa": "శ్రవణం",
    "Dhaniṣṭhā": "ధనిష్ఠ",
    "Śatabhiṣaj": "శతభిషం",
    "Pūrvabhādrapadā": "పూర్వాభాద్ర",
    "Uttarabhādrapadā": "ఉత్తరాభాద్ర",
    "Revatī": "రేవతి",

}



TITHI_NAMES = {

    "Krishna Amāvāsyā":
        "కృష్ణ అమావాస్య",

    "Krishna Amavasya":
        "కృష్ణ అమావాస్య",

    "Śukla Pratipadā":
        "శుక్ల పాడ్యమి",

    "Śukla Dvitīyā":
        "శుక్ల విదియ",

    "Śukla Tṛtīyā":
        "శుక్ల తదియ",

    "Śukla Caturthī":
        "శుక్ల చవితి",

    "Śukla Pañcamī":
        "శుక్ల పంచమి",

    "Śukla Ṣaṣṭhī":
        "శుక్ల షష్ఠి",

    "Śukla Saptamī":
        "శుక్ల సప్తమి",

    "Śukla Aṣṭamī":
        "శుక్ల అష్టమి",

    "Śukla Navamī":
        "శుక్ల నవమి",

    "Śukla Daśamī":
        "శుక్ల దశమి",

    "Śukla Ekādaśī":
        "శుక్ల ఏకాదశి",

    "Śukla Dvādaśī":
        "శుక్ల ద్వాదశి",

    "Śukla Trayodaśī":
        "శుక్ల త్రయోదశి",

    "Śukla Caturdaśī":
        "శుక్ల చతుర్దశి",

    "Pūrṇimā":
        "పౌర్ణమి",

}



def telugu_name(value):

    if not value:
        return ""

    return TELUGU_NAMES.get(
        value,
        value
    )



def telugu_tithi(value):

    if not value:
        return ""

    return TITHI_NAMES.get(
        value,
        value
    )



# ==========================
# Helpers
# ==========================


def _format_time(dt):

    if not dt:
        return ""

    return dt.astimezone(
        ZoneInfo("Asia/Kolkata")
    ).strftime("%H:%M")



def _get_rasi(longitude):

    return int(longitude // 30)



def _get_rutuvu(longitude):

    rasi = _get_rasi(longitude)


    if rasi in (0, 1):
        return "వసంత ఋతువు"

    elif rasi in (2, 3):
        return "గ్రీష్మ ఋతువు"

    elif rasi in (4, 5):
        return "వర్ష ఋతువు"

    elif rasi in (6, 7):
        return "శరదృతువు"

    elif rasi in (8, 9):
        return "హేమంత ఋతువు"

    return "శిశిర ఋతువు"



def _get_ayanam(longitude):

    rasi = _get_rasi(longitude)

    if rasi in (9,10,11,0,1,2):

        return "ఉత్తరాయణము"

    return "దక్షిణాయనము"



# ==========================
# Calendar Engine
# ==========================


def get_calendar():

    now = datetime.now(
        ZoneInfo("Asia/Kolkata")
    )


    engine = get_engine()


    jd = engine.datetime_to_jd(now)


    sun_longitude = engine.get_sidereal_longitude(
        jd,
        Planet.SUN
    )


    p = compute(
        now,
        LOCATION
    )


    return {


        "samvatsaram":

            (
                f"{telugu_name(p.samvat.samvatsara_name)} "
                "నామ సంవత్సరము"
            )
            if p.samvat
            else "",



        "ayanam":

            _get_ayanam(
                sun_longitude
            ),



        "rutuvu":

            _get_rutuvu(
                sun_longitude
            ),



        "maasam":

            (
                telugu_name(
                    p.masa.name
                )
                + " మాసము"
            )
            if p.masa
            else "",



        "tithi":

            telugu_tithi(
                p.tithi.name
            )
            if p.tithi
            else "",



        "tithi_end":

            _format_time(
                p.tithi.end
            )
            if p.tithi
            else "",



        "nakshatram":

            telugu_name(
                p.nakshatra.name
            )
            if p.nakshatra
            else "",



        "sunrise":

            _format_time(
                p.sun.sunrise
            )
            if p.sun
            else "",



        "sunset":

            _format_time(
                p.sun.sunset
            )
            if p.sun
            else "",


    }

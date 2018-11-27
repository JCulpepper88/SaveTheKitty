/* Level Template
8x8
[
 '--------',
 '--------',
 '--------',
 '--------',
 '--------',
 '--------',
 '--------',
 '--------',
];

12x12
[
 '------------',
 '------------',
 '------------',
 '------------',
 '------------',
 '------------',
 '------------',
 '------------',
 '------------',
 '------------',
 '------------',
 '------------',
];

15x15
[
 '---------------',
 '---------------',
 '---------------',
 '---------------',
 '---------------',
 '---------------',
 '---------------',
 '---------------',
 '---------------',
 '---------------',
 '---------------',
 '---------------',
 '---------------',
 '---------------',
 '---------------',
];

u user
m monster
k kitty
w weapon
* hole
= wall

Constraints:
 - Level must be square (same number of rows and columns)
 - Level should have one user, one kitty, one weapon, and at least one monster

Level Design:
  1-10: Bradley Harris
  11-42: John Culpepper
*/

const level1 = 
[
 'w=------',
 '-=--k-==',
 '--------',
 '==------',
 '--------',
 '-------=',
 '---=----',
 'u--=---m'
];

const level2 = 
[
 '--------',
 '--*---k-',
 'w-------',
 '----m-*-',
 '--------',
 '---*----',
 '-=======',
 '-------u'
];

const level3 =
[
 '--------',
 '-===-==-',
 '-=----=-',
 '-=w---=-',
 'k=----=u',
 '-=m---=-',
 '-==-===-',
 '--------'
];

const level4 =
[
 'u-m---=w',
 '------=-',
 '------=-',
 '------=-',
 '------=-',
 '-----k=-',
 '-======-',
 '--------',
];

const level5 =
[
 '-------u',
 '-=====--',
 '-=---=--',
 '-=-=-=--',
 '-=-=w=-m',
 '-=-===--',
 '-=------',
 '---k---=',
];

const level6 =
[
 '========',
 '=*u-m-*=',
 '=--*---=',
 '=-***--=',
 '=-****-=',
 '=---*--=',
 '=*k--w*=',
 '========',
];

const level7 =
[
 '========',
 '========',
 '=m----u=',
 '=-*=*--=',
 '=-=*=--=',
 '=w----k=',
 '========',
 '========',
];

const level8 =
[
 '========',
 '========',
 '==u--*==',
 '==-k--==',
 '==--*-==',
 '==--mw==',
 '========',
 '========',
];

const level9 =
[
 '--------',
 '-======-',
 '-=---w=-',
 '-=-==-=-',
 '-=----=-',
 '-=---m=-',
 '-==-===-',
 '-k----u-'
];

const level10 =
[
 '--w*-*--',
 '-*----*-',
 '-m--*---',
 '---*--k-',
 '--*----*',
 '*----*--',
 '-*--*-*-',
 '*---u--*',
];

const level11 =
[
 'u--=--k-',
 '-*---=-=',
 '--=-*---',
 '-*--=-=-',
 '---*==--',
 '-=-=---=',
 '--m--=--',
 '-=-=-=-w',
];

const level12 =
[
 '---*--u-',
 '-k------',
 '----*---',
 '--*---*-',
 '*---*---',
 '--m*---*',
 '-*----*-',
 '-w*--*--',
];

const level13 =
[
 'u-------',
 '***--*--',
 '----**--',
 '---k----',
 '-**-*--*',
 '---*m---',
 '----*-*-',
 '--*----w',
];

const level14 =
[
 '--------',
 '-*===*=-',
 '--k---=-',
 '=-*---=-',
 '--*---=-',
 '-=m---=w',
 '--*---==',
 '*---*--u',
];

const level15 =
[
 '*----*--',
 '-w=-----',
 '===-*---',
 '--------',
 '-*--*m-*',
 '--------',
 '------*-',
 'k--*---u',
];

const level16 =
[
 '---*---*',
 '-*---*--',
 '---m--*w',
 '---*---*',
 'k-------',
 '-*---*--',
 '---u----',
 '--------',
];

const level17 =
[
 '--------',
 '-**-**--',
 '--*w*---',
 '*-***--*',
 '--------',
 '-*-m-*--',
 '------k-',
 '-u--*---',
];

const level18 =
[
 '----=---',
 '-w=---=-',
 '---=--k-',
 '-=---=--',
 '--=-m--=',
 '=---=---',
 '--=---=-',
 '----=--u',
];

const level19 =
[
 '-=--u--=',
 'k--=-=--',
 '---m----',
 '***---*-',
 'w*--*---',
 '-*------',
 '-*-*----',
 '-------*',
];

const level20 =
[
 '-----*---*--',
 '--=-*--*----',
 '-=*---*-*---',
 '--========-=',
 '*-*---------',
 '--=------m*-',
 '-=------*---',
 '-=--=-=---*-',
 '-=*--k------',
 '-=---=--=--*',
 '-=-=--------',
 'w=u---*-----',
];

const level21 =
[
 '**---w----**',
 '---*****----',
 '-**-----**--',
 '----=---=--*',
 '--=---=---=-',
 '=-m-=---=---',
 '--=---=-m-=-',
 '=---=---=---',
 '--=---=---=-',
 '=---=---=-k=',
 '--=---=---=-',
 '=---=-u-=---',
];

const level22 =
[
 '------=-----=w=',
 '=-===---===----',
 '----m-=---m-=-=',
 '-==-=-==-====-=',
 '----=----------',
 '=-=---=-k-==-==',
 '=-===-=--------',
 '--m---====-===-',
 '-=-==---=------',
 '-=--===-=-==-==',
 '--=-=-----m----',
 '=-=m--===-=-==-',
 '--===---=-=----',
 '-=---==---===-=',
 'u--=----=-----=',
];

const level23 =
[
 '-------=---=',
 '--=--=---=--',
 '-u=----=m--=',
 '==---=---=--',
 '-m-=---=-m-=',
 '-=--m=---=--',
 '---=---=---=',
 '-=---=---=--',
 '---=-m-=--w=',
 '-=---=---=--',
 '---=---=---=',
 '-=---=-k-=--',
];

const level24 =
[
 '====------=----',
 '-----==-=-m-===',
 'w=-=--=-===----',
 '==-==-----==-=-',
 '--m---=-=-=--=-',
 '-====-=-=---===',
 '-=----=---=----',
 '-=-===k-===-==-',
 '------=--------',
 '=-===-===-==-==',
 '--m--------m--=',
 '===-===-=====-=',
 '----=-------=-=',
 '-=----===-=-=-=',
 '-m===--u--=----',
];

const level25 =
[
 '=----=-k=--u',
 '--=-=-----=-',
 '-=m----=-=--',
 '----=-=----=',
 '-=-=-----=--',
 '=-----=-=---',
 '---=-=-----=',
 '=-=m----=-=-',
 '-----=-=----',
 '--=-=---m-=-',
 '-=-----=-=--',
 'w---=-=----=',
];

const level26 =
[
 '=---=-=---=k',
 '=-=-=-=-=-=-',
 '=-=---=-=-=-',
 'm-=-=-=-=-=-',
 '=w=-=---=---',
 '=-=-=-=-=-=-',
 '=---=-=-=m=-',
 '=-=m=---=-=u',
 '--=-=-=-=-=-',
 '=-=-=-=m=-=-',
 '=-=---=-=---',
 '=-=-=-=---=-',
];

const level27 =
[
 '-=---=---=--',
 '---=-k-=---=',
 '-=---=---=--',
 '---=---=---=',
 '-=---=---=--',
 '-m-=---=-m-=',
 '=-=-=u=-=---',
 '--=--=--=--=',
 '---=---=----',
 '-=--=-=--=-=',
 '-----=------',
 '-=-=-w-=-=-=',
];

const level28 =
[
 'k----------u----',
 '=======-======-=',
 '-----------m----',
 '==-======-======',
 '------m---------',
 '-======-=====-==',
 '----------------',
 '=====-==-=======',
 '---------m------',
 '-==-=========-=-',
 '----------------',
 '=-=====-========',
 '----------------',
 '====-===-====-==',
 '----------------',
 '=m===-=-=====m=w',
];

const level29 =
[
 '==-----=u--=----',
 '---===---=-=-==-',
 '-=---=-===----=-',
 '-=-=-------==-=-',
 '---=m=====-m----',
 '==-=---=---=-=-=',
 '=--===---===-=--',
 '=-==---=------=-',
 '-----=====-==-=-',
 '-===-=-m---=----',
 '---=---===---===',
 '==-==-==---k---=',
 '--m-=----=====-=',
 '-==-=-==---m-=--',
 '-=-----===-=--=-',
 '-w-===-----==---',
];

const level30 =
[
 '--------m---------',
 '---====-----------',
 '---=-w----===-----',
 '---===-----k------',
 '---=------===-----',
 '---====-----------',
 '-------m----------',
 '----=====---====--',
 '----=-=-=---=-----',
 '----=-=-=---=-----',
 '----=---=---====--',
 '--------------m---',
 '------=--====-----',
 '-----=-=----=-----',
 '---------====-----',
 '---------=-u------',
 '----m----====-----',
 '------------------',
];

const level31 =
[
 '-m-------m----------',
 '--====----------m---',
 '--=-u-----====------',
 '--====------m-----m-',
 '-----=----====------',
 '--====-----m--------',
 '-------m-------m----',
 '--=--=---=--m-------',
 '-m=m=----=----------',
 '--==-m---=--=---=---',
 '--=m=----=-=-=-=k=--',
 '--=--=---=--=---==--',
 '------m----m-----=--',
 '---------------===--',
 '----m-----m------m--',
 '-------=-----=------',
 '-------=-----=------',
 '--------=-=-=----m--',
 '--m------=w=--------',
 '--------------------',
];

const level32 =
[
 '----------------------',
 '----------u-----------',
 '-m------------------m-',
 '---==-----------==----',
 '---=k=----m----=w=----',
 '---=-=--=====--=-=----',
 '---=--==-----==--=----',
 '---=-------------=----',
 '---=---==---==---=----',
 '----=-=--=-=--=-=-----',
 '----=-----------=---m-',
 '----=-----------=-----',
 '-m--=-m---=---m-=-----', 
 '----=-----------=-----',
 '----=---=---=---=-----',
 '----=----===----=-----',
 '----------------------',
 '--m---===---===-------',
 '---------===----------',
 '--------------------m-',
 '-----m-------m--------',
 '----------------------',
];

const level33 =  //inspired by Joy Hatcher
[
 '===---=----====--w',
 '===-=---==-====---',
 '==---====----==---',
 '=--=-====-==-==-==',
 '=-==-----m==-==-==',
 '=-=m-==-=-==----==',
 '--=-==--=-=--=-===',
 '-==-=--=----==-===',
 '-=--=-==-=====m--=',
 '-=-==--=---m====-=',
 '-=-=m=---==-====-=',
 '---=----===-====-=',
 '-=-====-==-------=',
 '-=-=-------==-====',
 '==---=-======-====',
 '----==----m----===',
 '-u-===-=======-===',
 'k--------------===',
];

const level34 =
[
'=========================',
'=----------------------k=',
'=-===================-=-=',
'=-=-------m-----------=-=',
'=-=-=================-=-=',
'=-=--------m--------=-=-=',
'=-=-=-===========-=-=-=-=',
'=-=-=-=-----------=-=-=-=',
'=-=-=-=-=========-=-=-=-=',
'=-=-=-=-----m---=-=-=-=-=',
'=-=-=-=-=-===-=-=-=-=-=-=',
'=-=-=-=-=-=---=-=-=-=-=-=',
'=-=-=-=-=-=-w-=-=-=-=-=-=',
'=-=m=-=-=-=---=-=-=-=-=-=',
'=-=-=-=-=-=-===-=-=-=-=-=',
'=-=-=-=-=----m----=-=-=-=',
'=-=-=-=-=========-=-=-=-=',
'=-=-=-=-----------=-=-=-=',
'=-=-=-=-===========-=-=-=',
'=-=-=------m----------=-=',
'=-=-=================-=-=',
'=-=-------------------=-=',
'=-=-===================-=',
'=u---------m------------=',
'=========================',
]

const level35 =
[
'----------u---------k',
'-==-==-==-==-==-==-==',
'--m------------------',
'=-=-=-=-=-=-=-=-=-=-=',
'=-=-=-=-=-=-=-=-=-=-=',
'-----m---------------',
'==-==-==-==-==-==-==-',
'---------------------',
'-=-=-=-=-=-=-=-=-=-=-',
'-=-=-=-=-=-=-=-=-=-=-',
'-----m----------m----',
'=-==-==-==-==-==-==-=',
'----------m----------',
'=-=-=-=-=-=-=-=-=-=-=',
'=-=-=-=-=-=-=-=-=-=-=',
'---------------m-----',
'-==-==-==-==-==-==-==',
'----------m----------',
'-=-=-=-=-=-=-=-=-=-=-',
'-=-=-=-=-=-=-=-=-=-=-',
'-------m---------w---',
]

const level36 =
[
'----------m-----------',
'----------=-----------',
'---------=w=----------',
'--------=---=---------',
'--------m---m---------',
'---------=-=----------',
'--------=---=---------',
'-------=-----=--------',
'-------m-----m--------',
'--------=---=---------',
'-------=-----=--------',
'------=-------=-------',
'------m-------m-------',
'-------=-----=--------',
'------=--=-=--=-------',
'-----=---=-=---=------',
'-----m---=-=---m------',
'---------=k=----------',
'---------=-=----------',
'---------=-=----------',
'------------------u---',
'----------------------',

]

const level37 =
[
'------------------',
'--=====---=====---',
'-------=-=--------',
'---===--w--===----',
'--=-*-=---=-*-=---',
'---===--k--===----',
'------------------',
'--------=---------',
'--------=---------',
'------------------',
'------------------',
'-----========-----',
'--=mmmmmmmmmmmm=--',
'---=mmmmmmmmmm=---',
'-----mmmmmmmm-----',
'-----========-----',
'------------------',
'--------u---------',
]

const level38 =
[
'---=-m--=-m--=----=-',
'-=-m-==---==-m-==---',
'--===--===--===--==-',
'--------------------',
'm=====----m---------',
'-=w--=--------=-----',
'-===-=-------===----',
'-=---=------=====---',
'-=-===-----==k--==--',
'-=---=-----==---==--',
'-===-=-------=-=----',
'-=---=---m---=-=----',
'-=-===-------=-=----',
'-=-----------=-=----',
'-=============-===--',
'---=---=---=-------=',
'-=-m-=---=-m-=---=--',
'---=---=---=---=---=',
'-=---=---=---=---=--',
'---=---=-u-=---=---=',
]

const level39 = 
[
'---------------------',
'--w-------m----m-----',
'---------------------',
'====================-',
'-------------------=-',
'mm=-============-=-=-',
'--=-=-----m------=-=-',
'--=-=-==========-=-=-',
'--=-=----------=-=-=-',
'--=-=-=-====-=-=-=-=-',
'--=m=-=-=-u--=-=-=m=-',
'--=-=-=-=-====-=-=-=-',
'--=-=-=----------=-=-',
'--=-=-==========-=-=-',
'--=-=-----m------=-=-',
'--=-=-============-=-',
'--=------------------',
'--===================',
'---------------------',
'------------------k--',
'---------------------',
]

const level40 =
[
'---------------------',
'-====-----===--------',
'-=-------==-==--m----',
'-====--m-=====-------',
'----=----=---=-------',
'-====----=---=-------',
'---------------------',
'm=---=-m--====--m----',
'-=---=----=----------',
'-=---=----===--------',
'--=w=-----=----------',
'---=------====-------',
'---------------------',
'-----=======--====---',
'-----=--=--=--=------',
'--m--=--=--=m-===----',
'-----=--k--=--=------',
'-----=-----=--====---',
'---------------------',
'----------------u----',
'---------------------',
]

const level41 =
[
'----------=----------',
'---------=w=---------',
'---------=-=---------',
'--------=---=--------',
'--------=---=--------',
'-------=--m--=-------',
'-------=-----=-------',
'------==-===-==------',
'------=---=---=------',
'-----=----=----=-----',
'-----=-m-----m-=-----',
'----=-----=-----=----',
'----=-----=-----=----',
'---====-=====-====---',
'---=------=------=---',
'--=--m----=--m----=--',
'--=---------------=--',
'-=--------=--------=-',
'-=--------=--------=-',
'=--u------=------k--=',
'=====================',
]

const level42 =
[
'-------====----------',
'------==w-=-----u----',
'-m---==---=----------',
'----------=-------m--',
'----===-=======-=----',
'----=-----=-----=----',
'----====-===-====----',
'----=-----=-----=----',
'----=-========-==----',
'----------=-------m--',
'----m-----=----------',
'----------=-m--------',
'--======-=====-====--',
'--=-------=-------=--',
'--====-=====-======--',
'--=-------=-------=--',
'--==-===========-==--',
'----------=--------m-',
'-----m----=-k--=-----',
'----------======-----',
'---------------------',
]

const levels = [
level1, level2, level3, level4, level15, level40, level29, level36, level35, level42,
level17, level5, level6, level18, level16, level30, level34, level37, level41,
level7, level19, level27, level8, level21, level22, level33, level38,
level23, level11, level28, level12, level13, level9, level32, level39,
level25, level10, level24, level26, level14, level20, level31
];
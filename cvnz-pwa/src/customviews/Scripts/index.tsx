import { Button } from '@mui/material';
import { firestore } from 'firebase';
import React from 'react';
import { db } from 'src/firebase/firebase';
import uuid from 'uuid/v1';
import firebase from 'firebase';

export class Risk {
  id: number = 0;
  type: string = '';
  risk: string = '';
  control: string[] = [];
}
export class GoalType {
  id?: number = 0;
  metric: string = '';
  goal: string = '';
}
function Scripts() {
  let risks: Risk[] =
    [
      {
        id: 1,
        "type": 'mandatory',
        "risk": "Bites & Stings",
        "control": [
          "ID and redeploy people with known allergies.",
          "Visually inspect site for insect/ spider activity.",
          "Mark and avoid insect nests.",
          "Wear PPE; Long sleeves & pants, gloves, enclosed shoes and hat.",
          "Provide and use insect repellent."
        ]
      },
      {
        id: 2,
        "type": 'mandatory',
        "risk": "Manual Handling",
        "control": [
          "Gentle warm up stretches prior to starting task/activity.",
          "Use mechanical aids.",
          "Set weight limits based on load terrain and people.",
          "Eliminate or limit twisting and over-reaching.",
          "Use 2 person lift where necessary.",
          "Rotate tasks.",
          "Maintain and check equipment condition.",
          "Team Leader/Project Coord to demonstrate correct technique.",
          "Direct supervision provided by Team Leader/Project Coord."
        ]
      },
      {
        id: 3,
        "type": 'mandatory',
        "risk": "Slips, Trips & Falls",
        "control": [
          "Remove trip hazards.",
          "Mark trip hazards.",
          "Ensure appropriate footwear with grip worn.",
          "Establish paths across slopes.",
          "Do not carry loads that limit visibility.",
          "Station vehicle in location with good access.",
          "Direct supervision by Team Leader/Project Coard."
        ]
      },
      {
        id: 4,
        "type": 'mandatory',
        "risk": "Soil Borne Diseases & Inflections",
        "control": [
          "ID team members in higher risk categories (diabetes, lung/kidney disease, open cuts) and deploy.",
          "Cover any minor cuts or scratches prior to work.",
          "Suppress dust and modify task to reduce dust.",
          "Provide washing facilities and wash areas of potential soil contact prior to eating and drinking.",
          "Wear PPE; Long sleeves & pant, enclosed shoes, hat (when outside), gloves (impervious if wet), safety glasses, dust masks (if large amounts of dust)."
        ]
      },
      {
        id: 5,
        "type": 'mandatory',
        "risk": "Vehicle Travel",
        "control": [
          "Comply with all road laws.",
          "Ensure pre-start checklist complete prior to operation.",
          "Wear seat belts when vehicle in motion.",
          "All tools and equip secured in cargo area.",
          "Minimise distraction and take breaks on long drives.",
          "Appoint navigator to assist with directions.",
          "Appoint a spotter when reversing.",
          "Ensure all doors and tailgates are closed before vehicle moves. - Maintain vehicle as per manufacturers manual."
        ]
      },
      {
        id: 6,
        "type": 'mandatory',
        "risk": "Working in Cold Conditions (Hypothermia)",
        "control": [
          "Make food and fluids available, including warm drinks where possible.",
          "Conduct gentle warm up stretches before commencing work, and after breaks.",
          "Rotate tasks to avoid prolonged exposure and specify frequency of rotations.",
          "Identify and Use sheltered area during periods of inactivity e.g.: breaks or extreme conditions.",
          "Structure work to avoid the coldest times of the day.",
          "Encourage team members to wear layered clothing that enables them to adjust their body temperature according to weather conditions and activity level.",
          "Wear a warm hat."
        ]
      },
      {
        id: 7,
        "type": 'mandatory',
        "risk": "Working in Snake Habitat",
        "control": [
          "Conduct heavy line walk throughout site.",
          "Avoid working in circular formation.",
          "Use tools to lift object on the ground e.g. logs prior to handling.",
          "Wear PPE including long sleeves & pants, boots, thick socks and gloves.",
          "If sighted stay clear and alert other workers.",
          "Review worksite viability during warmer months."
        ]
      },
      {
        id: 8,
        "type": 'mandatory',
        "risk": "COVID-19",
        "control": [
          "COVID 19 Management SOP in place.",
          "In-depth screen process for all new employees, volunteers and participants.",
          "COVID-19 specific induction process.",
          "Cleaning and disinfection regimen at all CV managed projects and activities.",
          "Good personal hygiene practices reinforced.",
          "Appropriate hygiene supplies available for each worksite.",
          "All workers to have their own personally labelled items.",
          "All worksites and CV vehicles to have a cleaning register."
        ]
      },
      {
        id: 9,
        "type": 'standard',
        "risk": "Boardwalk Construction - impact injuries, strains, manual handing, remote locations",
        "control": [
          "Arrange for materials to be delivered as near as possible to the work site to reduce the need for carrying.",
          "Keep the work site tidy and minimise trip hazards such as power cords, tools, timber.",
          "Erect signs that warn the public and restrict access to the work site.",
          "Do not allow team members to walk along bearers and joists.",
          "Specify and maintain a safe working space between team members.",
          "Maintain clear access to the construction site, and in any areas where tools or timber will be carried.",
          "Wear appropriate PPE, particularly hard hats where team members are working at different levels and high visibility vests."
        ]
      },
      {
        id: 10,
        "type": 'standard',
        "risk": "Bushfire",
        "control": [
          "Ensure that all team members know the boundaries of the survey area and remain within them at all times.",
          "Set times at which teams must return or report to the supervisor.",
          "Instruct that any team member who becomes lost should find the nearest shelter and remain there while using an agreed distress signal eg. three whistle blasts.",
          "Ensure that all team members have means of communicating an emergency signal (eg: whistle, radios) and fully understand the signals to be used.",
          "If the survey involves collecting seats, ensure that this is done hygienically eg. by using gloves, tongs etc.",
          "Work in pairs as a minimum group size.",
          "Wear boots that are suitable for walking, and sufficiently sturdy for the terrain."
        ]
      },
      {
        id: 11,
        "type": 'standard',
        "risk": "Collecting sharps",
        "control": [
          "Use tongs to pick up sharps.",
          "Determine a search strategy i.e. gain local knowledge of area, conduct a visual inspection of the site and flag any sharps for collection, minimise the number of persons involved in a search.",
          "Rake through known areas of disposal.",
          "Maintain a safe working distance of at least two metres to avoid the inadvertent scratching or spiking of other team members.",
          "Provide soap and water on site.",
          "Withdraw team if necessary to allow for professional removal of sharps.",
          "Put all sharps in approved sharps containers for disposal. Disposal to be in accordance with local health authority/council regulations.",
          "Wear gloves, sturdy footwear and high visibility vest. Eye protection may also be necessary."
        ]
      },
      {
        id: 12,
        "type": 'standard',
        "risk": "Fencing - injuries from wire (failure under strain or coiling), impact injury from picket rammer",
        "control": [
          "Arrange delivery of materials as near to fencing site as possible ie. minimise the need for carrying.",
          "Keep team members, who are not directly involved, well clear of any unsecured wire under tension.",
          "Use only approved methods of straining wire with a proper fencing strainer. Do not use a vehicle to strain wire.",
          "Demonstrate correct use of picket rammers, with emphasis on head, eye, hearing and hand safety.",
          "Do not raise the barrel of the rammer clear of the picket head.",
          "Specify and maintain safe working space between team members, especially when digging post holes or ramming the base of posts.",
          "Keep the work site clear of trip hazards such as posts, wire off-cuts, stones, tools etc.",
          "Wear gloves and eye protection whenever working with, or in close proximity to, wire that is coiled or under tension. Gloves should have gauntlets that protect the wrists when handling barbed wire.",
          "Wear gloves when handling chemically treated posts."
        ]
      },
      {
        id: 13,
        "type": 'standard',
        "risk": "Surveying & Data Collection",
        "control": [
          "Ensure that all team members know the boundaries of the survey area and remain within them at all times.",
          "Set times at which teams must return or report to the supervisor.",
          "Instruct that any team member who becomes lost should find the nearest shelter and remain there while using an agreed distress signal eg. three whistle blasts.",
          "Ensure that all team members have means of communicating an emergency signal (eg: whistle, radios) and fully understand the signals to be used.",
          "If the survey involves collecting seats, ensure that this is done hygienically eg. by using gloves, tongs etc.",
          "Work in pairs as a minimum group size.",
          "Wear boots that are suitable for walking, and sufficiently sturdy for the terrain."
        ]
      },
      {
        id: 14,
        "type": 'standard',
        "risk": "Weeding - Scratches, strains, chemical exposure, impact injuries",
        "control": [
          "Wear gloves whenever hands are working at ground level.",
          "Encourage gentle warm up stretches.",
          "Comply with all MSDS directions if using chemicals.",
          "Specify and maintain a safe working space between team members.",
          "Provide adequate washing facilities.",
          "Wear eye protection where potential for eye injury is identified. Chemical splashes and grass or twig spikes to eyes, are common weeding injuries."
        ]
      },
      {
        id: 15,
        "type": 'standard',
        "risk": "Asbestos-containing Materials",
        "control": [
          "Explain and demonstrate how to use, carry and store tools correctly.",
          "Do not wear jewellery that may become entangled.",
          "Maintain strict supervision.",
          "Use and maintain tools in accordance with manufacturer specifications.",
          "Specify and maintain a safe buffer zone around users.",
          "Ensure all equipment are in a safe working condition.",
          "Check for broken or cracked components or switches.",
          "Emergency shutdown procedures in place.",
          "Check that protective guards on tools are attached and effective.",
          "Clear trip hazards from the work site.",
          "Check team members have hair tied back and clothing tucked in, including drawstrings on jackets, hats, etc.",
          "Wear appropriate PPE as recommended by the manufacturer e.g. eye and ear protection, safety boots.",
          "Work with project partner/landholder to identify and isolate any areas that contain material suspected as being asbestos (before the project starts).",
          "Do not work in areas contaminated by asbestos.",
          "Volunteers to immediately notify supervisor if they find material that may contain asbestos.",
          "Do not remove or handle any material that may contain asbestos.",
          "Do not disturb soil or any other material that may contain asbestos.",
          "If you suspect asbestos, use flagging tape to cordon off the area, record the location (site name, description, !at/longs) and work in a different area.",
          "Team Leader to notify Regional Manager immediately upon finding suspected asbestos containing material."
        ]
      },
      {
        id: 16,
        "type": 'standard',
        "risk": "Using picket rammers",
        "control": [
          "Use rammers with a minimum length of 1.2 metres.",
          "Explain and demonstrate the proper technique for picket ramming.",
          "Encourage gentle warm up stretches before commencing picket ramming.",
          "Only allocate this task to people with the physical capacity to perform it safely.",
          "Rotate tasks, even if team members are not experiencing discomfort; specify rotation frequency.",
          "Only grip the vertical section of the handles when using the rammer.",
          "Rammer not to be lifted off post during operation.",
          "Remove/limit distractions for team members involved in post ramming.",
          "Specify and maintain a safe working distance between team members.",
          "All team members involved in task to wear hard hat, ear and eye protection, high visibility vests and gloves."
        ]
      },
      {
        id: 17,
        "type": 'standard',
        "risk": "Using Machete or cane knife",
        "control": [
          "Use only when an alternate tool is not practicable (eg loppers, hand saws, secateurs or similar).",
          "Ensure machetes are kept sharp.",
          "Team leaders only to sharpen (sharpen away from blade).",
          "Ensure handle and wrist strap are securely fastened.",
          "Only assign machetes to volunteers who have previously demonstrated high levels of responsibility.",
          "Allow a maximum of four machetes to be used at any one time.",
          "Team Leader to maintain direct supervision.",
          "Demonstrate correct use, including appropriate cutting angle (to avoid blade bouncing off target) and safe working distance (5 metre buffer zone).",
          "Use only for cutting soft vegetation (small branches, vines, grasses etc) not hard wood.",
          "Ensure appropriate PPE is worn, including gloves, long pants, sturdy boots and shin pads.",
          "Rotate tasks or take regular breaks to maintain concentration and reduce repetitive strain injury.",
          "Cover blade with a sheath or split hose when not in use, and store in an appropriate place."
        ]
      },
      {
        id: 18,
        "type": 'standard',
        "risk": "Working at heights - impact injury from falls or falling objects",
        "control": [
          "Safety rails, fall arrest device and helmet must be in place if fall height exceeds 2m.",
          "Complete check for any electrical services in work location.",
          "Maintain exclusion zone beneath elevated worker.",
          "Use well maintained ladder on non-slip surface.",
          "Limit workers at height and only one person permitted on ladder at a time.",
          "Secure tools and equipment being used at height.",
          "Always work facing the ladder.",
          "Appoint spotters."
        ]
      },
      {
        id: 19,
        "type": 'standard',
        "risk": "Chemical use - poisoning (inhalation, injestion, absorption)",
        "control": [
          "Read, retain and comply with the relevant Material Safety Data Sheet (MSDS).",
          "Check that there are no leaks in containers, and that spray equipment is operating correctly.",
          "Rotate tasks to avoid prolonged periods of exposure; specify frequency of rotations.",
          "Explain and demonstrate how to use, carry and store correctly.",
          "Specify and maintain safe working distance to avoid splash or spray drift contamination and take account of wind (spray drift) direction.",
          "Provide adequate washing facilities as directed by the MSDS.",
          "Wear appropriate PPE as advised on the MSDS. (Note that the use of certain PPE may accelerate the onset of heat stress.)"
        ]
      },
      {
        id: 20,
        "type": 'standard',
        "risk": "Working with/ near animals",
        "control": [
          "Provide approprilate animal handling training.",
          "Stress that all team members must be alert for unpredictable behaviour by animals.",
          "Take into account the physical strength and stature of persons handling particular animals/species.",
          "Wear appropriate PPE eg: glasses, gloves, long sleeves.",
          "Make adequate provision for the maintenance of personal hygiene (eg: clean water and soap)."
        ]
      },
      {
        id: 21,
        "type": 'standard',
        "risk": "Working in tick habitat - allergic reaction, tick borne diseases",
        "control": [
          "Prior to project, seek local advice on presence of ticks. (If in plague proportion, reconsider whether or not to continue.)",
          "Reduce tick access to skin by wearing long trousers (tucked into socks), long sleeved shirt (tucked in), broad-brimmed hat (reduces likelihood of ticks from getting into hair or down the neck of clothing)",
          "If possible, wear light colored clothing so that any ticks on clothing are more readily spotted.",
          "Apply repellent containing DEET to exposed skin.",
          "Minimise disturbance to vegetation (as this appears to make ticks more active) by working for short periods in one location where ticks are a problem.",
          "After leaving tick area, have team members check each other for ticks hair, behind ears, back of neck etc.",
          "Encourage team members to check themselves fully when showering.",
          "If possible, after working in a high tick population area, place clothing in a hot dryer for 20 minutes."
        ]
      },
      {
        id: 22,
        "type": 'standard',
        "risk": "Working near water - drowning",
        "control": [
          "Maintain a safe distance between team members and water that is deemed dangerous because of depth, current, murkiness, turbulence, difficulty of escape etc.",
          "Designate areas on steep, slippery or unstable banks as no-go areas and flag or tape off.",
          "Identify non-swimmers and ensure that they are deployed away from higher risk areas.",
          "Where there is an inadvertent possibility of the need to rescue someone from the water, ensure there are rescue aids readily accessible eg. rope, long pole, flotation device. Where there is a current, these aids must be positioned downstream of the most likely entry point.",
          "Formulate an emergency response plan that is based on non-contact rescue strategies.",
          "Maintain strict compliance with Conservation Volunteers' policy of not facilitating recreational swimming.",
          "Encourage team members to have adequate spare, dry socks.",
          "Provide adequate washing facilities eg. soap and clean water."
        ]
      },
      {
        id: 23,
        "type": 'standard',
        "risk": "Mulching - inhalation/eye injury, allergies from dust, soft tissue injuries",
        "control": [
          "Explain and demonstrate wheelbarrow loading and use.",
          "Explain and demonstrate correct techniques for using a rake.",
          "Explain and demonstrate correct use of fork/shovel.",
          "Explain and demonstrate how to carry, put down and store the tools, giving consideration to both the users and the general public.",
          "Check that all tools are in good repair, and that there are no split handles or loose tool heads.",
          "Redeploy to other tasks (upwind), any person who has disclosed a pre-existing respiratory infection or allergy eg. Asthma.",
          "Damp down mulch before working with it.",
          "Maintain safe working distance of at least 3 metres.",
          "So far as possible, clear the area of any trip hazards."
        ]
      },
      {
        id: 24,
        "type": 'standard',
        "risk": "Using Power Tools - electrocution, impact injuries, strains, manual handing, flying particles",
        "control": [
          "Explain and demonstrate how to use, carry and store tools correctly.",
          "Maintain strict supervision.",
          "Use and maintain tools in accordance with manufacturer specifications.",
          "Specify and maintain a safe buffer zone around power tool users.",
          "Ensure all equipment and lead attachments have been tested and tagged and are in a safe working condition and protected from water.",
          "No broken plugs, sockets or switches.",
          "No frayed or damaged leads.",
          "Emergency shutdown procedures in place.",
          "Circuit breaker/safety switch installed and or RCD used when operating tool.",
          "Start/stop switches clearly marked, in easy reach of operator.",
          "Check that protective guards on tools are attached and effective.",
          "Clear trip hazards from the work site.",
          "Position the generator, if used, in a dry, stable location and prevent access to it by unauthorised people.",
          "Check that the team members have hair tied back and clothing tucked in, including drawstrings on jackets, hats, etc.",
          "Wear appropriate PPE as recommended by the manufacturer eg. eye and ear protection, safety boots."
        ]
      },
      {
        id: 25,
        "type": 'standard',
        "risk": "Working with/ near brush cutters",
        "control": [
          "Ensure the operator is properly trained.",
          "Ensure the operator is of sufficient strength and stature to control the equipment safely.",
          "Check general mechanical condition of brush cutter before use.",
          "Remove all obstacles or potential missiles (eg: stones, wire or timber) from the work area, prior to work commencing.",
          "Ensure no other person is within 20 metres while the brush cutter is running.",
          "Ensure that any other persons working in the general vicinity are wearing eye protection.",
          "Adhere to all manufacturer specifications for use and maintenance.",
          "Keep all feet and hands well clear of moving parts.",
          "Stop operating the brush cutter if other people are close by.",
          "Appoint a 'spotter' to provide additional site surveillance.",
          "Turn off the brush cutter when not in use or while removing debris.",
          "Wear appropriate PPE eg: glasses, eye/face protection, safety boots, overalls, ear protection and high visibility vests."
        ]
      },
      {
        id: 26,
        "type": 'standard',
        "risk": "Working with/ near Power Auger",
        "control": [
          "Ensure the operator is properly trained and competent to operate the equipment.",
          "Ensure the operator is of sufficient strength and stature to control the equipment safely.",
          "Ensure the operator knows the proper use of the controls, especially how to engage the brake and how to shut down the auger quickly if necessary.",
          "Complete a pre-operation check of the auger before use; checking the condition of the drill bit, condition of padding and anti-vibration mountings, condition of exhaust (this should direct exhaust fumes away from the operator), ensuring that automatic braking system and switches work and checking for any loose bolts.",
          "Ensure that a 3 meter buffer zone is maintained between the auger and other people.",
          "Adhere to all manufacturer specifications for use and maintenance.",
          "Keep feet and hands well clear of rotating auger bit.",
          "Tuck in loose clothing, keep hat cords behind your neck and tie back long hair or put it down the back of the shirt and remove necklaces to avoid entanglement.",
          "Stop operating the auger if other people move within the buffer zone.",
          "Appoint a 'spotter' to provide additional site surveillance.",
          "Engage auger brake when moving between holes and turn off the auger when not in use.",
          "Only run the auger for short periods of time (eg 20 minutes). This will help prevent muscle strain injuries, heat stress, and also prevents the machine from overheating. Allow auger to cool for a few minutes before refuelling.",
          "Wear appropriate PPE, as advised by the manufacturer eg: safety boots, gloves, ear protection and high visibility vest."
        ]
      },
      {
        id: 27,
        "type": 'standard',
        "risk": "Using Swinging Tools - Impact injuries, blisters, eye injuries",
        "control": [
          "Ensure that suitable work boots, with reinforced toes, are being worn.",
          "Encourage gentle warm up stretches before commencement and after breaks.",
          "Maintain safe working distance of at least 3 metres; for short handled tools (eg: hammer), 2 metres.",
          "Explain and demonstrate how to use, carry and store tools correctly.",
          "Maintain tools in good condition.",
          "Establish a firm footing before swinging tools.",
          "Raise tools no more than shoulder height on back swing.",
          "Rotate tasks even if team members are not experiencing discomfort; specify rotation frequency.",
          "Adjust the duration of work periods to take account of the physical capacities of the team members.",
          "Wear appropriate PPE eg. high visibility vest, hard hat, glasses and gloves."
        ]
      },
      {
        id: 28,
        "type": 'standard',
        "risk": "Working near road sides - impact injuries from vehicles",
        "control": [
          "Eliminate or minimise the need for team members to work near roadsides.",
          "Arrange for the placement of appropriate signage eg: SLOW DOWN, WORKERS NEAR ROADSIDE, and/or witches hats to indicate to drivers that there are workers ahead. (Note: This must be done by a competent person who has completed the proper training and received authorisation by the appropriate roads management authority.)",
          "Maintain direct and continuous supervision.",
          "Appoint a 'spotter' to provide additional supervision.",
          "Check that all team members understand the signals to be used, and that the signals are clear and unambiguous.",
          "Work upwind or out of fume and dust range.",
          "Wear high visibility vests or clothing."
        ]
      },
      {
        id: 29,
        "type": 'standard',
        "risk": "Working near heavy machinery",
        "control": [
          "Eliminate or minimise the need for team members to work near heavy machinery.",
          "Advise operator of the location and movement patterns of those working nearby.",
          "Maintain direct liaison between the team, supervisor and the plant operator.",
          "Develop and demonstrate a set of signals to be used; these must be clear, unambiguous and understood by all.",
          "Work upwind or out of fume and dust range.",
          "Appoint a 'spotter' to provide additional supervision.",
          "Wear high visibility vests.",
          "Wear appropriate PPE eg. glasses, respirators, ear protection."
        ]
      },
      {
        id: 30,
        "type": 'standard',
        "risk": "Working with schools",
        "control": [
          "Do not allow yourself or any volunteer to be alone with a school student or young person.",
          "Always try to arrange for the CV team to have access to a toilet that is not used by the students.",
          "Avoid moving a CV vehicle on school property while students are out of class or in close proximity. If the vehicle absolutely must be moved, switch on hazard lights, appoint spotters in high visibility vests and drive at a speed no greater than 10kph.",
          "Where possible coordinate breaks for your team with the meal breaks of the school students, this reduces the need to manage third parties entering your worksite.",
          "Ensure that tools or personal belongings are not left in unsecured, unsupervised areas.",
          "Insist that a teacher remain present if students are to work with or near to a CV team.",
          "Observe the sign in/ sign out procedures required by the school and observe the rules, laws and standards that apply to the school grounds, eg. no smoking or wearing clothes with offensive slogans or images.",
          "Become familiar with the school's emergency evacuation plan and muster point."
        ]
      },
      {
        id: 31,
        "type": 'standard',
        "risk": "Tree Planting- impact injuries, muscle strain",
        "control": [
          "Conduct a visual inspection of the site, and remove potential risks such as broken glass, wire etc.",
          "Use kneeling mats or padding if there is a danger of spike injuries from glass, stones etc.",
          "Rotate tasks, even if team members are not experiencing discomfort.",
          "Take regular breaks and encourage gentle stretching.",
          "Provide adequate hand washing facilities.",
          "Specify and maintain a safe working space between team members; usually two metres.",
          "Wear gloves when handling soil, and additional PPE as necessary."
        ]
      },
      {
        id: 32,
        "type": 'standard',
        "risk": "Using Temporary Accommodation",
        "control": [
          "Clear all exits so they are uncluttered and readily accessible.",
          "Inspect all gas and electrical appliances to ensure that they are in a safe, operational condition.",
          "Do not overload power points with too many appliances.",
          "Formulate a fire evacuation plan and communicate it to all team members.",
          "Remove any combustible materials that are stored near a possible fire source.",
          "Ensure backup (emergency) lighting is available eg. extra torches.",
          "Ensure that the CV \"No Smoking\" policy is enforced.",
          "Keep food storage and preparation areas, showers and toilets clean and hygienic.",
          "Store all garbage outside the accommodation, and dispose of it at the first practicable opportunity."
        ]
      },
      {
        id: 33,
        "type": 'standard',
        "risk": "Working in the dark",
        "control": [
          "Check that no person has a physical or psychological problem that renders them unsuitable for working in the dark.",
          "Check that each person has a reliable torch.",
          "Advise all participants to have ample, layered clothing.",
          "Check that work area boundaries are understood and meeting point is known.",
          "Work in pairs as a minimum group size; establish a 'buddy' system.",
          "If possible, during daylight hours inspect the site and remove or clearly mark trip hazards or other hazardous areas.",
          "Provide each person with a whistle and ensure that each person knows that three long blasts is the standard emergency/distress signal.",
          "Avoid rough or slippery areas.",
          "Minimise the number, weight and bulk of items to be carried.",
          "Wear high visibility vests."
        ]
      },
      {
        id: 34,
        "type": 'standard',
        "risk": "Bushwalking",
        "control": [
          "Check that all participants have the physical capacity to safely complete the planned walk.",
          "If unfamiliar with the route, seek local advice and carry a reliable map.",
          "Do not proceed, or modify the plan, if extreme weather is likely. (Do not proceed on days of total fire ban.)",
          "Advise a reliable person of the proposed route and return time. Advise this person when the group has returned.",
          "Remind participants to carry necessary medications eg. Ventolin.",
          "Check that all participants have sufficient water.",
          "Check that participants have suitable footwear and clothing for the likely weather and terrain.",
          "Regulate walk pace. Generally the leader will walk at the front.",
          "Appoint a reliable person as 'whip' or 'tailend Charlie' who remains at the rear of the group and alerts the leader to any problems.",
          "Provide each person with a whistle and ensure that each person knows that three long blasts is the standard emergency/distress signal.",
          "Carry a first aid kit."
        ]
      },
      {
        id: 35,
        "type": 'standard',
        "risk": "Working in Windy Conditions",
        "control": [
          "Check local weather forecast.",
          "Is a severe weather warning current?",
          "Will you be working under trees on the site?",
          "Does the site contain old growth or dead trees?",
          "Are there dead limbs or hanging timber that could fall?",
          "Consider the types of activities being undertaken (e.g. mulching/digging/planting may lead to more dust/debris in the air).",
          "Check local fire warnings (windy weather can often mean bushfire weather).",
          "Do you or any of your team members have a moderate to severe respiratory condition (e.g. asthma)?"
        ]
      },
      {
        id: 36,
        "type": 'standard',
        "risk": "Working with/ near chainsaws",
        "control": [
          "Chainsaws only to be used by licensed operators.",
          "Place warning signs at appropriate boundaries of the work area.",
          "Clear other workers and debris from the immediate area of the operator and the fall zone.",
          "Appoint a 'spotter' to guard against any other team member or third party straying into the work area.",
          "All persons on site to wear high visibility vests.",
          "Always engage chain brake when not cutting.",
          "Start the saw with it resting on the ground. DO NOT DROP START.",
          "Wear appropriate PPE eg. hard hat, ear muffs, safety boots, face guardls, tellers trousers/chaps."
        ]
      },
      {
        id: 37,
        "type": 'standard',
        "risk": "Plant Propagation - Strains, soil borne diseases, manual handling",
        "control": [
          "Avoid prolonged standing on hard surfaces.",
          "Rotate tasks, even if team members are not experiencing discomfort.",
          "Take regular breaks for stretching and gentle exercise.",
          "Provide adequate washing facilities.",
          "Open bags of potting mix at arm's length. (Avoid breathing the dust that may be released.)",
          "Damp down potting mix before use.",
          "Have eye protection available, and use as required.",
          "Wear gloves when handling soil.",
          "Wear face masks when handling potting mix."
        ]
      },
      {
        id: 38,
        "type": 'standard',
        "risk": "Track Construction and Maintenance - impact injuries, strains, manual handing, remote locations",
        "control": [
          "Arrange delivery of tools and materials so as to minimise distance over which things need to be carried.",
          "Encourage gentle warm up stretches before commencement and after breaks.",
          "Maintain tools in good condition.",
          "Maintain safe working distance of at least 3 metres.",
          "Arrange emergency communication and explain this to all team members.",
          "Rotate tasks even if team members are not experiencing discomfort.",
          "Wear appropriate PPE inc. high visibility vests, gloves, safety glasses.",
          "Ensure that boots are suitable for walking, and sufficiently sturdy for the terrain."
        ]
      },
      {
        id: 39,
        "type": 'standard',
        "risk": "Seed collection - cuts/scratches, eye injuries, allergic reactions, falls from height",
        "control": [
          "Rotate tasks to guard against postural overuse injuries.",
          "Specify and maintain a safe working distance between team members.",
          "Explain and demonstrate tool use.",
          "Ensure not team members are working directly under others.",
          "Wear PPE including safety glasses, gloves, high vis vests and if required hard hats."
        ]
      },
      {
        id: 40,
        "type": 'standard',
        "risk": "Litter collection - laceration/spike injuries, bites/stings, infections",
        "control": [
          "Ensure adequate washing facilities are available and are used by team members.",
          "Look carefully at litter items or piles that might be a refuge for snakes or spiders.",
          "Check objects for spikes or sharp edges.",
          "Use tongs to pick up any objects that are known, or suspected, to be dangerous eg. syringes.",
          "Place any syringes in a proper sharps container.",
          "Seek assistance when lifting heavy objects.",
          "Wear gloves and eye protection when handling litter.",
          "Place any glass or other small sharp objects on a bucket or other hard sided container."
        ]
      }

    ]

  async function runScripts() {
    let batch = db.batch();
    risks.forEach((entity) => {
      let docRef = db.collection("Risks").doc(uuid());
      batch.set(docRef, entity, { merge: true });
    });

    goalTypes.forEach((entity) => {
      let docRef = db.collection("GoalTypes").doc(uuid());
      batch.set(docRef, entity, { merge: true });
    });
    await batch.commit();
  }

  let goalTypes: GoalType[] =
    [
      {
        id: 1,
        "goal": 'Community Participation',
        "metric": "# of participants",
      },
      {
        id: 2,
        "goal": 'Debris Removal(Weight)',
        "metric": "tonnes",
      },
      {
        id: 3,
        "goal": 'Debris Removal(Area)',
        "metric": "m2",
      }, {
        id: 4,
        "goal": 'Fencing',
        "metric": "m",
      },
      {
        id: 5,
        "goal": 'Plant Propagation',
        "metric": "# of plants",
      },
      {
        id: 6,
        "goal": 'Revegetation(Number)',
        "metric": "# of plants",
      }, {
        id: 7,
        "goal": 'Revegetation(Area)',
        "metric": "m2",
      },
      {
        id: 8,
        "goal": 'Seed Collection',
        "metric": "kg",
      },
      {
        id: 9,
        "goal": 'Site Preparation(Preparation)',
        "metric": "m2",
      }, {
        id: 10,
        "goal": 'Site Preparation(Treatment)',
        "metric": "m2",
      },
      {
        id: 11,
        "goal": 'Weed Treatment',
        "metric": "m2",
      }
    ]


  return (
    <div>
      <br />
      <Button style={{ margin: "10px" }} variant="contained" color="primary" onClick={runScripts}>Run Scripts</Button>
      <br />

    </div>
  );
}


export default Scripts;


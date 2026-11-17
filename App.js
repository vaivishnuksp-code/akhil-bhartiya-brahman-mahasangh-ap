import React, {useState} from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput,
  Image, Alert, SafeAreaView, Modal
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {StatusBar} from 'expo-status-bar';
import {Ionicons} from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
const LOGO = require('./assets/organization_logo.jpg');
const ID_REFERENCE = require('./assets/identity_card_reference.jpg');

const ORG = {
  name: 'AKHIL BHARTIYA BRAHMAN MAHASANGH',
  state: 'Andhra Pradesh',
  office: 'Ammavarisala, Vempalle Po & Mdl, Kadapa District, A.P.',
  phones: ['91773 48930', '96421 81300', '99496 43891'],
  email: 'apabbm@gmail.com',
};

const districts = [
  'Alluri Sitharama Raju','Anakapalli','Ananthapuramu','Annamayya',
  'Bapatla','Chittoor','Dr. B. R. Ambedkar Konaseema','East Godavari',
  'Eluru','Guntur','Kakinada','Krishna','Kurnool','Nandyal',
  'NTR','Palnadu','Parvathipuram Manyam','Prakasam','Srikakulam',
  'Sri Potti Sriramulu Nellore','Sri Sathya Sai','Tirupati',
  'Visakhapatnam','Vizianagaram','West Godavari','YSR Kadapa'
];

const stateBearers = [
  {name:'State President', role:'State President'},
  {name:'State General Secretary', role:'State General Secretary'},
  {name:'State Treasurer', role:'State Treasurer'},
  {name:'State Technical Director', role:'Technical Director'}
];

const districtBearers = {
  'Tirupati': [{name:'District President',role:'President'},{name:'District General Secretary',role:'General Secretary'}],
  'Chittoor': [{name:'District President',role:'President'},{name:'District General Secretary',role:'General Secretary'}],
  'Kadapa': [{name:'District President',role:'President'},{name:'District General Secretary',role:'General Secretary'}]
};

function Header({title,navigation}) {
  return <View style={styles.header}>
    <TouchableOpacity onPress={()=>navigation.openDrawer()} style={styles.menuBtn}>
      <Ionicons name="menu" size={31} color="#fff"/>
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
  </View>;
}

function Home({navigation}) {
  return <SafeAreaView style={styles.container}>
    <Header title="Home" navigation={navigation}/>
    <ScrollView contentContainerStyle={styles.home}>
      <Image source={LOGO} style={styles.logo}/>
      <View style={styles.officeCard}>
        <Text style={styles.officeTitle}>Andhra Pradesh State Office</Text>
        <Text style={styles.address}>{ORG.office}</Text>
        <Text style={styles.phoneLine}>Cell: {ORG.phones.join('  |  ')}</Text>
        <Text style={styles.emailLine}>Email: {ORG.email}</Text>
      </View>
      <Text style={styles.welcome}>Organization Services</Text>
      <View style={styles.grid}>
        {[
          ['people-outline','State Cabinet','StateCabinet'],
          ['map-outline','District Cabinet','DistrictCabinet'],
          ['images-outline','Gallery','Gallery'],
          ['document-text-outline','Information','Information'],
          ['call-outline','Contact Details','Contact'],
          ['card-outline','Identity Card','Identity']
        ].map(([icon,label,screen])=>
          <TouchableOpacity key={screen} style={styles.tile} onPress={()=>navigation.navigate(screen)}>
            <Ionicons name={icon} size={31} color="#173B7A"/>
            <Text style={styles.tileText}>{label}</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  </SafeAreaView>;
}

function StateCabinet({navigation}) {
  return <SafeAreaView style={styles.container}>
    <Header title="State Cabinet" navigation={navigation}/>
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.sectionTitle}>State Office Bearers</Text>
      <Text style={styles.muted}>Official names and photographs can be published here by the authorized Technical Department.</Text>
      {stateBearers.map((p,i)=><View style={styles.person} key={i}>
        <View style={styles.avatar}><Ionicons name="person" size={29} color="#173B7A"/></View>
        <View><Text style={styles.personName}>{p.name}</Text><Text style={styles.personRole}>{p.role}</Text></View>
      </View>)}
    </ScrollView>
  </SafeAreaView>;
}

function DistrictCabinet({navigation}) {
  const [selected,setSelected] = useState(null);
  return <SafeAreaView style={styles.container}>
    <Header title="District Cabinet" navigation={navigation}/>
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.sectionTitle}>Andhra Pradesh — 26 Districts</Text>
      {districts.map((d,i)=><TouchableOpacity key={d} style={styles.district} onPress={()=>setSelected(d)}>
        <Text style={styles.districtText}>{i+1}. {d}</Text>
        <Ionicons name="chevron-forward" size={20} color="#777"/>
      </TouchableOpacity>)}
      {selected && <View style={styles.selectedBox}>
        <Text style={styles.sectionTitle}>{selected} Office Bearers</Text>
        {(districtBearers[selected] || [
          {name:'District President',role:'Details to be published'},
          {name:'District General Secretary',role:'Details to be published'}
        ]).map((p,i)=><View style={styles.person} key={i}>
          <View style={styles.avatar}><Ionicons name="person" size={27} color="#173B7A"/></View>
          <View><Text style={styles.personName}>{p.name}</Text><Text style={styles.personRole}>{p.role}</Text></View>
        </View>)}
      </View>}
    </ScrollView>
  </SafeAreaView>;
}

function Gallery({navigation}) {
  return <SafeAreaView style={styles.container}>
    <Header title="Gallery" navigation={navigation}/>
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.sectionTitle}>Organization Gallery</Text>
      <Text style={styles.muted}>Authorized users can upload organization photographs. Only approved photographs are published.</Text>
      <View style={styles.placeholderGallery}>
        <Ionicons name="images-outline" size={64} color="#173B7A"/>
        <Text style={styles.muted}>No approved gallery photographs yet.</Text>
      </View>
    </ScrollView>
  </SafeAreaView>;
}

function Information({navigation}) {
  const docs=['Organization Information','Latest Circulars','Brochures','Notices','Downloads'];
  return <SafeAreaView style={styles.container}>
    <Header title="Information" navigation={navigation}/>
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.sectionTitle}>Information & Brochures</Text>
      <Text style={styles.muted}>Documents published by the Technical Department will appear here.</Text>
      {docs.map((x,i)=><TouchableOpacity key={x} style={styles.doc} onPress={()=>Alert.alert(x,'This section is ready for Technical Department uploads.')}>
        <Ionicons name={i===2?'book-outline':'document-text-outline'} size={26} color="#173B7A"/>
        <Text style={styles.docText}>{x}</Text>
        <Ionicons name="chevron-forward" size={20} color="#777"/>
      </TouchableOpacity>)}
    </ScrollView>
  </SafeAreaView>;
}

function Contact({navigation}) {
  return <SafeAreaView style={styles.container}>
    <Header title="Contact Details" navigation={navigation}/>
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.sectionTitle}>Andhra Pradesh State Office</Text>
      <View style={styles.contactCard}><Ionicons name="location-outline" size={28} color="#173B7A"/><Text style={styles.contactText}>{ORG.office}</Text></View>
      {ORG.phones.map(p=><View style={styles.contactCard} key={p}><Ionicons name="call-outline" size={28} color="#173B7A"/><Text style={styles.contactText}>{p}</Text></View>)}
      <View style={styles.contactCard}><Ionicons name="mail-outline" size={28} color="#173B7A"/><Text style={styles.contactText}>{ORG.email}</Text></View>
    </ScrollView>
  </SafeAreaView>;
}

function Identity({navigation}) {
  const [submitted,setSubmitted]=useState(false);
  const [approved,setApproved]=useState(false);
  const [form,setForm]=useState({
    fullName:'',dob:'',mobile:'',email:'',address:'',district:'',
    designation:'',gothram:'',village:'',aadhaar:'',membershipNo:''
  });
  const set=(k,v)=>setForm({...form,[k]:v});

  if (approved) return <SafeAreaView style={styles.container}>
    <Header title="Approved Identity Card" navigation={navigation}/>
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.sectionTitle}>Official Identity Card</Text>
      <IdCard data={form}/>
      <Text style={styles.muted}>This is a prototype rendering of the supplied organization ID-card design. Production issuance should occur only after authorized Technical Director approval.</Text>
    </ScrollView>
  </SafeAreaView>;

  if (submitted) return <SafeAreaView style={styles.container}>
    <Header title="Identity Card" navigation={navigation}/>
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.pending}>
        <Ionicons name="time-outline" size={60} color="#B26A00"/>
        <Text style={styles.pendingTitle}>Application Submitted</Text>
        <Text style={styles.muted}>Your particulars have been sent to the State Committee Technical Director for verification.</Text>
        <Text style={styles.idNote}>After approval, the official identity card will be generated in the organization's prescribed design.</Text>
      </View>
      <TouchableOpacity style={styles.demoApprove} onPress={()=>setApproved(true)}>
        <Text style={styles.primaryText}>Demo: Technical Director Approve</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={()=>setSubmitted(false)}>
        <Text style={styles.secondaryText}>Edit Details</Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>;

  const fields=[
    ['fullName','Full Name'],['dob','Date of Birth'],['mobile','Mobile Number'],
    ['email','Email'],['address','Full Address'],['district','District'],
    ['designation','Organization Designation'],['gothram','Gothram'],
    ['village','Village'],['aadhaar','Aadhaar Number (if prescribed)'],
    ['membershipNo','Membership Number']
  ];
  return <SafeAreaView style={styles.container}>
    <Header title="Identity Card" navigation={navigation}/>
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.sectionTitle}>Member Sign Up / ID Card Application</Text>
      <Text style={styles.muted}>Enter the particulars prescribed by the organization. The application must be approved by the authorized State Committee Technical Director.</Text>
      {fields.map(([k,label])=><TextInput key={k} placeholder={label} value={form[k]} onChangeText={v=>set(k,v)}
        style={styles.input} multiline={k==='address'} keyboardType={k==='mobile' || k==='aadhaar'?'phone-pad':'default'}/>)}
      <TouchableOpacity style={styles.primaryButton} onPress={()=>{
        if(!form.fullName || !form.mobile || !form.district){Alert.alert('Required','Please enter Full Name, Mobile Number and District.');return;}
        setSubmitted(true);
      }}>
        <Text style={styles.primaryText}>Submit for Technical Approval</Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>;
}

function IdCard({data}) {
  return <View style={styles.idCard}>
    <Image source={LOGO} style={styles.idLogo}/>
    <Text style={styles.idOrg}>{ORG.name}</Text>
    <Text style={styles.idState}>Andhra Pradesh</Text>
    <Text style={styles.idReg}>Reg. No: Maha0829/2010/Pune</Text>
    <Text style={styles.idOffice}>Office: Ammavarisala, Vempalle, Kadapa Dist 516329</Text>
    <Text style={styles.idPhone}>Phone: 9177348930  |  Email: apabbm@gmail.com</Text>
    <View style={styles.idBody}>
      <View style={styles.idPhoto}><Ionicons name="person" size={62} color="#777"/></View>
      <View style={styles.idDetails}>
        <Text style={styles.idSmall}>ID No.</Text>
        <Text style={styles.idNumber}>APEG {data.membershipNo || '00001'}</Text>
      </View>
    </View>
    <Text style={styles.idName}>{data.fullName || 'MEMBER NAME'}</Text>
    <Text style={styles.idRow}><Text style={styles.idLabel}>Designation : </Text>{data.designation || '—'}</Text>
    <Text style={styles.idRow}><Text style={styles.idLabel}>Gothram : </Text>{data.gothram || '—'}</Text>
    <Text style={styles.idRow}><Text style={styles.idLabel}>Village : </Text>{data.village || '—'}</Text>
    <Text style={styles.idRow}><Text style={styles.idLabel}>District : </Text>{data.district || '—'}</Text>
    <Text style={styles.idRow}><Text style={styles.idLabel}>Cell No : </Text>{data.mobile || '—'}</Text>
    <Text style={styles.idRow}><Text style={styles.idLabel}>Aadhaar No. : </Text>{data.aadhaar ? '********' + data.aadhaar.slice(-4) : '—'}</Text>
    <Text style={styles.idRow}><Text style={styles.idLabel}>Validity upto : </Text>To be set by authorized committee</Text>
    <Text style={styles.signature}>State President</Text>
  </View>;
}

function CustomDrawer(props) {
  return <DrawerContentScrollView {...props}>
    <View style={styles.drawerHeader}>
      <Image source={LOGO} style={styles.drawerLogo}/>
      <Text style={styles.drawerOrg}>{ORG.name}</Text>
      <Text style={styles.drawerState}>Andhra Pradesh</Text>
    </View>
    <DrawerItemList {...props}/>
  </DrawerContentScrollView>;
}

export default function App() {
  return <NavigationContainer>
    <StatusBar style="light"/>
    <Drawer.Navigator drawerContent={p=><CustomDrawer {...p}/>} screenOptions={{
      headerShown:false, drawerActiveTintColor:'#173B7A', drawerLabelStyle:{fontSize:15}
    }}>
      <Drawer.Screen name="Home" component={Home} options={{drawerIcon:({color})=><Ionicons name="home-outline" size={22} color={color}/>}}/>
      <Drawer.Screen name="StateCabinet" component={StateCabinet} options={{title:'State Cabinet',drawerIcon:({color})=><Ionicons name="people-outline" size={22} color={color}/>}}/>
      <Drawer.Screen name="DistrictCabinet" component={DistrictCabinet} options={{title:'District Cabinet',drawerIcon:({color})=><Ionicons name="map-outline" size={22} color={color}/>}}/>
      <Drawer.Screen name="Gallery" component={Gallery} options={{drawerIcon:({color})=><Ionicons name="images-outline" size={22} color={color}/>}}/>
      <Drawer.Screen name="Information" component={Information} options={{drawerIcon:({color})=><Ionicons name="document-text-outline" size={22} color={color}/>}}/>
      <Drawer.Screen name="Contact" component={Contact} options={{title:'Contact Details',drawerIcon:({color})=><Ionicons name="call-outline" size={22} color={color}/>}}/>
      <Drawer.Screen name="Identity" component={Identity} options={{title:'Identity Card',drawerIcon:({color})=><Ionicons name="card-outline" size={22} color={color}/>}}/>
    </Drawer.Navigator>
  </NavigationContainer>;
}

const styles=StyleSheet.create({
  container:{flex:1,backgroundColor:'#FFFDE0'},
  header:{height:62,backgroundColor:'#173B7A',flexDirection:'row',alignItems:'center',paddingHorizontal:14},
  menuBtn:{padding:6,marginRight:10}, headerTitle:{color:'#fff',fontSize:20,fontWeight:'800'},
  home:{padding:18}, logo:{width:'100%',height:180,resizeMode:'contain',marginBottom:10},
  officeCard:{backgroundColor:'#FFF6B0',borderRadius:16,padding:17,borderWidth:1,borderColor:'#E6C84A',marginBottom:20},
  officeTitle:{fontSize:20,fontWeight:'900',color:'#173B7A'}, address:{fontSize:15,color:'#333',marginTop:7,lineHeight:21},
  phoneLine:{fontSize:14,color:'#173B7A',fontWeight:'700',marginTop:7}, emailLine:{fontSize:14,color:'#C33',fontWeight:'700',marginTop:4},
  welcome:{fontSize:20,fontWeight:'900',color:'#173B7A',marginBottom:12}, grid:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'},
  tile:{width:'48%',backgroundColor:'#fff',borderRadius:16,padding:20,marginBottom:14,alignItems:'center',elevation:2},
  tileText:{marginTop:9,fontWeight:'800',color:'#222',textAlign:'center'}, page:{padding:18},
  sectionTitle:{fontSize:20,fontWeight:'900',color:'#173B7A',marginBottom:13}, muted:{color:'#666',fontSize:14,lineHeight:21,marginBottom:12},
  person:{backgroundColor:'#fff',borderRadius:14,padding:14,marginBottom:10,flexDirection:'row',alignItems:'center',elevation:1},
  avatar:{width:52,height:52,borderRadius:26,backgroundColor:'#E9EFFB',alignItems:'center',justifyContent:'center',marginRight:13},
  personName:{fontSize:16,fontWeight:'800',color:'#222'},personRole:{fontSize:14,color:'#666',marginTop:3},
  district:{backgroundColor:'#fff',padding:16,borderRadius:12,marginBottom:8,flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
  districtText:{fontSize:15,fontWeight:'700',color:'#222'},selectedBox:{marginTop:18},
  placeholderGallery:{height:220,backgroundColor:'#fff',borderRadius:16,alignItems:'center',justifyContent:'center',marginTop:20},
  doc:{backgroundColor:'#fff',padding:17,borderRadius:13,marginBottom:10,flexDirection:'row',alignItems:'center'},
  docText:{flex:1,fontSize:16,fontWeight:'700',marginLeft:12},contactCard:{backgroundColor:'#fff',padding:18,borderRadius:14,marginBottom:12,flexDirection:'row',alignItems:'center'},
  contactText:{flex:1,fontSize:15,lineHeight:21,marginLeft:12,color:'#333'},input:{backgroundColor:'#fff',borderWidth:1,borderColor:'#D6C968',borderRadius:11,paddingHorizontal:14,paddingVertical:13,marginBottom:11,fontSize:15,minHeight:48},
  primaryButton:{backgroundColor:'#173B7A',padding:16,borderRadius:12,alignItems:'center',marginTop:8,marginBottom:30},
  primaryText:{color:'#fff',fontWeight:'900',fontSize:15},secondaryButton:{borderWidth:1,borderColor:'#173B7A',padding:14,borderRadius:12,alignItems:'center',marginTop:20},
  secondaryText:{color:'#173B7A',fontWeight:'800'},pending:{backgroundColor:'#fff',padding:24,borderRadius:18,alignItems:'center',elevation:1},
  pendingTitle:{fontSize:21,fontWeight:'900',marginVertical:12,color:'#222'},idNote:{marginTop:15,color:'#173B7A',fontWeight:'800',textAlign:'center',lineHeight:21},
  demoApprove:{backgroundColor:'#B26A00',padding:16,borderRadius:12,alignItems:'center',marginTop:20},drawerHeader:{backgroundColor:'#173B7A',padding:18,alignItems:'center'},
  drawerLogo:{width:115,height:115,borderRadius:58,resizeMode:'cover'},drawerOrg:{color:'#fff',fontWeight:'900',fontSize:16,textAlign:'center',marginTop:10},
  drawerState:{color:'#FFD95A',fontWeight:'800',marginTop:3},idCard:{backgroundColor:'#FFF2A6',borderWidth:2,borderColor:'#E2B522',borderRadius:10,padding:12,marginBottom:18},
  idLogo:{width:72,height:72,alignSelf:'center',resizeMode:'contain'},idOrg:{fontSize:16,fontWeight:'900',color:'#D51E1E',textAlign:'center'},
  idState:{fontSize:15,fontWeight:'900',color:'#1744C1',textAlign:'center',marginTop:3},idReg:{fontSize:9,color:'#333',textAlign:'center',marginTop:3},
  idOffice:{fontSize:8,color:'#173B7A',fontWeight:'800',textAlign:'center',marginTop:6},idPhone:{fontSize:8,color:'#D51E1E',fontWeight:'800',textAlign:'center',marginBottom:8},
  idBody:{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:3},idPhoto:{width:105,height:120,backgroundColor:'#DDE6F8',borderWidth:2,borderColor:'#1744C1',alignItems:'center',justifyContent:'center'},
  idDetails:{marginLeft:12},idSmall:{fontSize:13,fontWeight:'800'},idNumber:{fontSize:18,fontWeight:'900',color:'#1744C1',maxWidth:105},idName:{fontSize:20,fontWeight:'900',color:'#1744C1',textAlign:'center',marginVertical:8},
  idRow:{fontSize:13,color:'#111',marginTop:5},idLabel:{fontWeight:'900'},signature:{alignSelf:'flex-end',fontSize:12,color:'#1744C1',fontWeight:'900',marginTop:12}
});

import React,{useState} from 'react';
import {Platform,StyleSheet,Text,View} from 'react-native';
import {SkeuoButton,SkeuoIconButton,SkeuoInput,SkeuoSwitch,SkeuoCheckbox,SkeuoRadioGroup,SkeuoSlider,SkeuoRotaryKnob,SkeuoStepper,SkeuoTabs,SkeuoCard,SkeuoBadge,SkeuoDialog,SkeuoBottomSheet,SkeuoKeyButton,SkeuoPhotoCarousel,SkeuoProgressRings,SkeuoTimer,useSkeuo} from '../components/skeuomorphic';
import {SkeuoBottomBar} from '../components/skeuomorphic/skeuo-bottom-bar';
import {SummaryCard} from '../components/skeuomorphic/blocks/summary-card';
import {TransactionList} from '../components/skeuomorphic/blocks/transaction-list';
import {HabitList} from '../components/skeuomorphic/blocks/habit-list';
import {ActivityChart} from '../components/skeuomorphic/blocks/activity-chart';
export function NativeDemo({slug}:{slug:string}){const {colors:c}=useSkeuo();const [enabled,setEnabled]=useState(true);const [value,setValue]=useState('week');const [volume,setVolume]=useState(65);const [tab,setTab]=useState('home');const [open,setOpen]=useState(false);const [count,setCount]=useState(0);const [knob,setKnob]=useState(68);const [quantity,setQuantity]=useState(3);const options=[{value:'week',label:'Week'},{value:'month',label:'Month'}];const items=[{value:'home',label:'Home'},{value:'transactions',label:'Payments'},{value:'analysis',label:'Analysis'},{value:'profile',label:'Profile'}];let content:React.ReactNode;
if (slug.startsWith('bottom-bar-')) {
  content = (
    <View style={styles.bottomBarDemo}>
      <View style={styles.bottomBarContent}>
        <Text style={{color:c.ink,fontSize:25,fontWeight:'500'}}>Somewhere to return.</Text>
        <View style={{height:140,borderWidth:1,borderColor:c.edge,borderRadius:16,backgroundColor:c.surface,alignItems:'center',justifyContent:'center'}}>
          <Text style={{color:c.muted}}>{items.find(item=>item.value===tab)?.label}</Text>
        </View>
      </View>
      <SkeuoBottomBar variant={slug.replace('bottom-bar-','') as 'dock'|'keys'|'rail'|'pill'} items={items} value={tab} onValueChange={setTab}/>
    </View>
  );
}
else switch(slug){case 'button':content=<><SkeuoButton variant="accent" onPress={()=>setCount(count+1)}>Save changes</SkeuoButton><SkeuoButton onPress={()=>setCount(count+1)}>A quieter action</SkeuoButton><SkeuoButton disabled onPress={()=>{}}>Unavailable</SkeuoButton><Text style={{color:c.muted,fontSize:12}}>{count?`Pressed ${count} times`:'Go on. Give it a press.'}</Text></>;break;
case 'keyboard-button':content=<View style={styles.keyboard}><SkeuoKeyButton label="Command" onPress={()=>setCount(count+1)}/><SkeuoKeyButton label="Option" symbol="⌥" onPress={()=>setCount(count+1)}/><SkeuoKeyButton label="Shift" symbol="⇧" onPress={()=>setCount(count+1)}/></View>;break;
case 'icon-button':content=<SkeuoIconButton label="Add item" icon={<Text style={{fontSize:24,color:c.ink}}>+</Text>} onPress={()=>setCount(count+1)}/>;break;
case 'input':content=<><SkeuoInput label="Email address" placeholder="you@example.com" keyboardType="email-address"/><SkeuoInput label="Your message" multiline placeholder="Leave a little note…"/></>;break;
case 'switch':content=<><SkeuoSwitch label="Touch feedback" checked={enabled} onCheckedChange={setEnabled}/><SkeuoSwitch label="Unavailable" checked={false} onCheckedChange={()=>{}} disabled/></>;break;
case 'checkbox':
  content = <View style={styles.choiceStack}>
    <SkeuoCheckbox label="A little room for good things" checked={enabled} onCheckedChange={setEnabled} />
    <SkeuoCheckbox label="Unavailable" checked={false} onCheckedChange={setEnabled} disabled />
  </View>;
  break;
case 'radio-group':
  content = <RadioGroupDemo />;
  break;
case 'rotary-knob':content=<SkeuoRotaryKnob label="Volume" value={knob} onValueChange={setKnob} formatValue={value=>`${value}%`} onTurnSound={direction=>{
  if (Platform.OS === 'web' && window.parent !== window) {
    window.parent.postMessage({type:'skeuo-knob-sound',direction},window.location.origin);
  }
}}/>;break;
case 'stepper':content=<SkeuoStepper label="Quantity" value={quantity} onValueChange={setQuantity}/>;break;
case 'slider':content=<SkeuoSlider label="Depth" value={volume} onValueChange={setVolume}/>;break;
case 'tabs':content=<><SkeuoTabs label="Period" value={value} onValueChange={setValue} options={options}/><Text style={{color:c.muted}}>A look at your {value}.</Text></>;break;
case 'card':content=<SkeuoCard><Text style={{color:c.ink,fontSize:23,fontWeight:'500'}}>A place for your ideas.</Text><Text style={{color:c.muted,lineHeight:22}}>A fine edge. A little depth. Enough room for what matters.</Text><SkeuoButton onPress={()=>setCount(count+1)}>Make something</SkeuoButton></SkeuoCard>;break;
case 'badge':content=<View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'center',gap:10}}><SkeuoBadge>In progress</SkeuoBadge><SkeuoBadge>Made with care</SkeuoBadge></View>;break;
case 'dialog':case 'bottom-sheet':{const Panel=slug==='dialog'?SkeuoDialog:SkeuoBottomSheet;content=<><SkeuoButton onPress={()=>setOpen(true)}>{slug==='dialog'?'Open dialog':'Open bottom sheet'}</SkeuoButton><Panel open={open} onOpenChange={setOpen} title="A little moment."><Text style={{color:c.muted,lineHeight:22}}>A quiet place for the next decision. The same materials, all the way through.</Text></Panel></>;break;}
case 'photo-carousel': {
  const hostedPreview = Platform.OS === 'web' && window.location.pathname.startsWith('/native-preview/');
  content = <SkeuoPhotoCarousel items={[
    {uri:hostedPreview ? '/examples/lake.jpg' : 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=640&q=80',title:'Somewhere quiet',label:'Field notes',meta:'01',caption:'Early light on still water.',description:'A quiet morning at the lake before the trail fills up.'},
    {uri:hostedPreview ? '/examples/architecture-light.jpg' : 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=640&q=80',title:'The longer way home',label:'Looking up',meta:'02',caption:'A change of perspective on the way back.'},
    {uri:hostedPreview ? '/examples/geometry.jpg' : 'https://images.pexels.com/photos/13926760/pexels-photo-13926760.jpeg?auto=compress&w=640',title:'Lines and light',label:'Geometry',meta:'03',caption:'A study in angles and afternoon light.'},
  ]}/>;
  break;
}
case 'progress-rings':content=<SkeuoProgressRings items={[
  {id:'focus',label:'Focus time',value:45,max:60,unit:'min'},
  {id:'movement',label:'Movement',value:4,max:8,unit:'km'},
  {id:'reading',label:'Reading',value:18,max:30,unit:'pages'},
]}/>;break;
case 'timer':content=<SkeuoTimer/>;break;
case 'summary-card':content=<SummaryCard/>;break;case 'transaction-list':content=<TransactionList/>;break;case 'habit-list':content=<HabitList/>;break;case 'activity-chart':content=<ActivityChart/>;break;
default:content=<Text style={{color:c.muted}}>Choose a component.</Text>;
}
  const centered = centeredDemos.has(slug);
  return (
    <View style={[styles.demo, slug === 'button' && styles.buttonStack, centered && styles.centered]}>
      {content}
    </View>
  );
}

const centeredDemos = new Set(['icon-button', 'checkbox', 'radio-group', 'tabs', 'dialog', 'bottom-sheet']);

const radioSamples = {
  single: { labels: ['Standard'], selected: 'Standard' },
  four: { labels: ['Daily', 'Weekly', 'Monthly', 'Yearly'], selected: 'Weekly' },
  long: {
    labels: ['5 minutes', '15 minutes', '30 minutes', '1 hour', '2 hours', '3 hours', '6 hours', '12 hours', '24 hours'],
    selected: '30 minutes',
  },
};

const radioSampleTabs = [
  { value: 'single', label: 'Single' },
  { value: 'four', label: 'Four' },
  { value: 'long', label: 'Long list' },
];

function RadioGroupDemo() {
  const [sample, setSample] = useState<keyof typeof radioSamples>('four');
  const [value, setValue] = useState(radioSamples.four.selected);
  return (
    <View style={styles.radioDemo}>
      <SkeuoTabs label="Example size" value={sample} options={radioSampleTabs} onValueChange={(next) => {
        const size = next as keyof typeof radioSamples;
        setSample(size);
        setValue(radioSamples[size].selected);
      }} />
      <SkeuoRadioGroup
        key={sample}
        label="Frequency"
        value={value}
        onValueChange={setValue}
        options={radioSamples[sample].labels.map((label) => ({ value: label, label }))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  demo: { gap: 20 },
  buttonStack: { alignSelf: 'center', width: '100%', maxWidth: 194 },
  centered: { alignItems: 'center' },
  choiceStack: { maxWidth: '100%' },
  radioDemo: { width: '100%', maxWidth: 350, gap: 16 },
  keyboard: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 14 },
  bottomBarDemo: { gap: 24 },
  bottomBarContent: { gap: 24, marginHorizontal: 16 },
});

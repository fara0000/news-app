import { useTheme } from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import SmallNewsCard, {SLIDER_WIDTH, ITEM_WIDTH} from '../SmallNewsCard/SmallNewsCard';

const RelatedSliders = ({ ...props }) => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  const {colors: {card, text}} = useTheme();
  // console.log(props)

 const _renderItem = ({item, index}) => {
    return (
        <SmallNewsCard
          data={item}
          index={index}
          {...props}
        />
    );
}


  return (
    <View>
      <Carousel
        layout="default"
        layoutCardOffset={10}
        ref={isCarousel}
        data={props.newsListByRelated}
        renderItem={_renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={150}
        inactiveSlideShift={0}
        useScrollView={true}
        onSnapToItem={(index) => setIndex(index)}
        apparitionDelay={1000}
        
      />
{/* 
     <View style={{position: 'absolute', bottom: '-35%', justifyContent: 'center', width: '100%',}}>
     <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: '#fff',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
     </View> */}
    </View>
  );
};


export default RelatedSliders;

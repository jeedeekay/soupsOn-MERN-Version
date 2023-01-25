import { View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = () => {
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <MaterialCommunityIcons
                name="bowl-mix"
                size={45}
                color='white'
            />
            <Text
                style={{
                    fontSize: 35,
                    paddingLeft: 5,
                    fontWeight: 'bold',
                    color: 'white'
                }}
            >
                soup's on!
            </Text>
        </View>
    );
};



export default Header;
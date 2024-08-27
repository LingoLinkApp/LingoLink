/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import {useColorScheme} from 'react-native';
import {colours} from '@/src/constants/colours';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof colours.light & keyof typeof colours.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return colours[theme][colorName];
  }
}

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Body, colors, Eyebrow, PageTitle, Screen } from '@/components/ui';
import { resolveAndOpen } from '@/lib/enterprise';

const actions = [
  { title: 'RSVP / Reserve', subtitle: 'Rose on Piedmont and current weekly programming', slug: 'rose-on-piedmont' },
  { title: 'Friday GROWN-ISH', subtitle: 'Open the current Friday reservation destination', slug: 'grown-ish' },
  { title: 'Buy Hakuna Matata', subtitle: 'Go directly to the approved book checkout', slug: 'hakuna-matata' },
  { title: 'Shop Bodega', subtitle: 'Open the enterprise commerce platform', slug: 'bodega' },
  { title: 'Shop STUSH', subtitle: 'Open the current STUSH storefront', slug: 'stush' },
  { title: 'Open GOOD TIMES', subtitle: 'Launch the lifestyle technology platform', slug: 'good-times' },
  { title: 'Download Black Pages', subtitle: 'Open the correct store listing or prelaunch fallback', slug: 'black-pages' },
  { title: 'Explore The University', subtitle: 'Programs, applications and platform access', slug: 'the-university' },
  { title: 'Support Sole Exchange', subtitle: 'Campaign and volunteer access', slug: 'sole-exchange' },
];

export default function ActionsScreen() {
  return (
    <Screen>
      <Eyebrow>Immediate Action</Eyebrow>
      <PageTitle>What do you need to do right now?</PageTitle>
      <Body>One command menu routes each tap to the proper website, form, checkout, reservation or app store.</Body>
      <View style={styles.grid}>
        {actions.map((action) => (
          <Pressable
            key={action.title}
            onPress={() => resolveAndOpen(action.slug, 'mobile_actions')}
            style={({ pressed }) => [styles.action, pressed && styles.pressed]}
          >
            <Text style={styles.title}>{action.title}</Text>
            <Text style={styles.subtitle}>{action.subtitle}</Text>
            <Text style={styles.open}>OPEN →</Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: { gap: 10 },
  action: { backgroundColor: colors.panel, borderWidth: 1, borderColor: colors.border, padding: 18 },
  pressed: { backgroundColor: colors.panel2, borderColor: colors.gold },
  title: { color: colors.cream, fontSize: 22, fontWeight: '700' },
  subtitle: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 5 },
  open: { color: colors.gold2, fontSize: 11, fontWeight: '800', letterSpacing: 1, marginTop: 14 },
});

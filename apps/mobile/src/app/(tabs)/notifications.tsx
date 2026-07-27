import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import { Body, colors, Eyebrow, MessageCard, PageTitle, Screen } from '@/components/ui';
import { getPublishedContent, type ContentItem } from '@/lib/enterprise';

export default function NotificationsScreen() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedContent()
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Screen>
      <Eyebrow>Enterprise Inbox</Eyebrow>
      <PageTitle>Relevant updates, not random blasts.</PageTitle>
      <Body>Announcements, launches, events, opportunities and member messages will appear here after audience targeting.</Body>
      {loading ? <ActivityIndicator color={colors.gold2} size="large" /> : null}
      {!loading && items.length === 0 ? <Text style={styles.empty}>No active enterprise updates.</Text> : null}
      {items.map((item) => (
        <MessageCard
          key={item.id}
          title={item.title}
          body={item.summary || item.body}
          action={item.content_type === 'app_launch' ? 'EARLY ACCESS →' : 'OPEN →'}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: { color: colors.muted, fontSize: 15, paddingVertical: 30, textAlign: 'center' },
});

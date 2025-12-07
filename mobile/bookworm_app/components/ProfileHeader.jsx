import { View, Text } from "react-native";
import { useAuthStore } from "../store/authStore";
import { Image } from "expo-image";
import styles from "../assets/styles/profile.styles";
import { formatMemberSince } from "../lib/utils";

export default function ProfileHeader() {
  const { user } = useAuthStore();

  if (!user) return null;

  const profileImage = user.profileImage || `https://ui-avatars.com/api/?name=${user.username}&background=random&length=1`;
  const joinedDate = user.createdAt ? formatMemberSince(user.createdAt) : "Unknown";

  return (
    <View style={styles.profileHeader}>
      <Image source={{ uri: profileImage }} style={styles.profileImage} />

      <View style={styles.profileInfo}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.memberSince}>🗓️ Joined {joinedDate}</Text>
      </View>
    </View>
  );
}
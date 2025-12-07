import { View, Text } from "react-native";
import { useAuthStore } from "../store/authStore";
import { Image } from "expo-image";
import styles from "../assets/styles/profile.styles";
import { formatMemberSince } from "../lib/utils";

export default function ProfileHeader() {
  const { user } = useAuthStore();

  if (!user) return null;

  // Fallback for profile image
  const profileImage = user.profileImage && user.profileImage.trim() !== "" 
    ? user.profileImage 
    : `https://ui-avatars.com/api/?name=${user.username}&background=random&length=1`;

  // Extract date from MongoDB _id if createdAt is missing
  const getCreationDate = () => {
    if (user.createdAt) return formatMemberSince(user.createdAt);
    if (user.id) {
      const timestamp = parseInt(user.id.substring(0, 8), 16) * 1000;
      return formatMemberSince(new Date(timestamp));
    }
    return "Unknown";
  };

  const joinedDate = getCreationDate();

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
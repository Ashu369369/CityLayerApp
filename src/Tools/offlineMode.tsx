import Toast from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { createDepartment, deleteDepartment, updateDepartment } from '../api/deptApi';
import { createProject } from '../api/projectApi';
import { createProgram } from '../api/programApi';
import { createAnnouncement } from '../api/announcementsApi';
import notifications from '../demoData/notifications';

 const saveOfflineData = async (key: string, data: any) => {
  try {
    const existing = await AsyncStorage.getItem(key);
    const parsed = existing ? JSON.parse(existing) : [];
    parsed.push(data);
    await AsyncStorage.setItem(key, JSON.stringify(parsed));
  } catch (err) {
    console.error("Failed to save offline data:", err);
  }
};



export const syncQueue = async (key: string) => {
  const data = await AsyncStorage.getItem(key);
  if (data === null) return;
  console.log("syncing " + key);

  const queue = JSON.parse(data);

  const syncHandler = async (
    item: any,
    action: () => Promise<any>, // ← change here from Promise<void> to Promise<any>
    successMsg: string,
    failureMsg: string
  ): Promise<boolean> => {
    try {
      await action(); // we don't need the return value here
      Toast.show({
        type: 'success',
        text1: `✅ ${successMsg}`,
        text2: `Successfully synced.`,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        Toast.show({
          type: 'error',
          text1: `❌ ${failureMsg}`,
          text2: `Error: ${error.message}`,
        });
        console.error(`❌ Failed to sync item in ${key}`, item, error.message);
      } else {
        Toast.show({
          type: 'error',
          text1: `❌ ${failureMsg}`,
          text2: 'Unknown error occurred.',
        });
        console.error(`❌ Failed to sync item in ${key}`, item, error);
      }
      return false;
    }
    return true;
  };
  

  switch (key) {
    case "create_departments":
      for (const item of queue) {
        const result = await syncHandler(item, async () => createDepartment(item), 'Department synced!', 'Failed to sync department');
        if (!result) return;
      }
      break;

    case "create_projects":
      for (const item of queue) {
        const result = await syncHandler(item, async () => createProject(item), 'Project synced!', 'Failed to sync project');
        if (!result) return;
      }
      break;

    case "create_program":
      for (const item of queue) {
        const result = await syncHandler(item, async () => createProgram(item), 'Program synced!', 'Failed to sync program');
        if (!result) return;
      }
      break;

    case "create_announcement":
      for (const item of queue) {
        const result = await syncHandler(item, async ()  => createAnnouncement(item), 'Announcement synced!', 'Failed to sync announcement');
        if (!result) return;
      }
      break;

    case "create_notifications":
      for (const item of queue) {
        const result = await syncHandler(item, async ()  => notifications.push(item), 'Notifications synced!', 'Failed to sync Notifications');
        if (!result) return;
      }
      break;

    case "delete_departments":
      for (const item of queue) {
        const result = await syncHandler(item, async ()  => deleteDepartment(item), 'Department delted!', 'Failed to delete Department');
        if (!result) return;
      }
      break;

    case "edit_departments":
      for (const item of queue) {
        const result = await syncHandler(item, async ()  => updateDepartment( item.departmentid, item.data), 'Department Updated!', 'Failed to Updated the Department');
        if (!result) return;
      }
      break;

    default:
      console.warn(`⚠️ Unknown sync key: ${key}`);
      return;
  }

  await AsyncStorage.removeItem(key);
  Toast.show({
    type: 'success',
    text1: `✅ ${key} synced and cleared.`,
  });
  console.log(`✅ ${key} synced and cleared.`);
};


let unsubscribe: (() => void) | null = null;
let isSyncing = false;
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const backgroundSyncService = () => {
  if (unsubscribe) return; // Prevent multiple listeners

  unsubscribe = NetInfo.addEventListener(async (state) => {
    if (state.isConnected && !isSyncing) {
      isSyncing = true;
      console.log('🟢 Online - Syncing data...');
      
      await delay(3000);

      try {
        await syncQueue('create_departments');
        await syncQueue('create_projects');
        await syncQueue('create_program');
        await syncQueue('create_announcement');
        await syncQueue('create_notifications');
        await syncQueue('delete_departments');
        await syncQueue('edit_departments');

      } catch (err) {
        Toast.show({
          type: 'error',
          text1: '❌ Error syncing',
          text2: 'Something went wrong while syncing data.',
        });
        console.error("❌ Error syncing:", err);
      } finally {
        isSyncing = false;
      }
    }
  });

  console.log("📡 Background sync listener initialized");
};






export default saveOfflineData;
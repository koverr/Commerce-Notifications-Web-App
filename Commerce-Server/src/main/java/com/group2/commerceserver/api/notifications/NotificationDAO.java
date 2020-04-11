package com.group2.commerceserver.api.notifications;

import java.util.List;

import com.group2.commerceserver.models.Notification;

public interface NotificationDAO {
	
	public void addNotification();
	
	public void editNotification(int notificationId);
	
	public void markAsRead(int notificationId);
	
	public Notification get(int notificationId);
	
	public void delete(int notificationId);
	
	public List<Notification> list();
	
}

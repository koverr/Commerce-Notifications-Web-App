package com.group2.commerceserver.api.notifications;

import java.util.List;

import com.group2.commerceserver.models.Notification;
import com.group2.commerceserver.models.Rule;
import com.group2.commerceserver.models.Trigger;

public interface NotificationDAO {
	
	public void addTrigger(Rule rule);
	
	public void deleteTrigger(int triggerId, String triggerName);

	public List<Trigger> getTriggers(int userId);
	
	public void markAsRead(int notificationId);
	
	public List<Notification> getNotifications(int triggerId);
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Rule } from '../models/rule';
import { Filters } from '../models/filters';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    // Endpoints
    private addRuleUrl = 'api/notifications/add';
    private editRuleUrl = 'api/notifications/edit';
    private deleteRuleUrl = 'api/notifications/delete';
    private getRulesUrl = 'api/notifications/get/rules';
    private getNotificationsUrl = 'api/notifications/get';
    private exportUrl = 'api/notifications/export';

    constructor(private http: HttpClient) { }

    getRules(filters: Filters) {
        return this.http.post<any>(this.getRulesUrl, filters);
    }

    addRule(rule: Rule) {
        return this.http.post<any>(this.addRuleUrl, rule);
    }

    editRule(rule: Rule) {
        return this.http.post<any>(this.editRuleUrl, rule);
    }

    deleteRule(triggerId: number, triggerName: string) {
        const params = new HttpParams()
            .set('triggerId', triggerId.toString())
            .set('triggerName', triggerName);
        return this.http.delete<any>(this.deleteRuleUrl, {params});
    }

    getNotifications(triggerId: number, filters: Filters) {
        const url = `${this.getNotificationsUrl}/${triggerId}/notifications`;
        return this.http.post<any>(url, filters);
    }

    getAllNotifications(userId: number) {
        const url = `${this.exportUrl}/${userId}`;
        return this.http.get<any>(url);
    }
}

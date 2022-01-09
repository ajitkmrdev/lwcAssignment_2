public without sharing class parentSearchController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(String accName,Integer recordNumber){
        String nameKey = '%' + accName + '%';
        system.debug('nameKey>>'+nameKey+'recordNumber>>'+recordNumber);
       return [SELECT Id,Name from Account where Name LIKE :nameKey LIMIT :recordNumber ];
    }

    //search account list based on type field value 
    @AuraEnabled(cacheable=true)
    public static List<Account> getTypeAccountList(String typeValue,Integer recordNumber){
        String typeValueKey = '%' + typeValue + '%';
        system.debug('typeValueKey>>'+typeValueKey+'recordNumber>>'+recordNumber);
       return [SELECT Id,Name,Type,Industry,Website,AccountNumber from Account where Type LIKE :typeValueKey LIMIT :recordNumber ];
    }
    @AuraEnabled(cacheable=true)
    public static String getAccountRecordTypeId(){
        String accId = '';
        List<RecordType> rt = [select Id from RecordType where sObjectType='Account' LIMIT 1];
        accId = rt[0].Id;
        system.debug('accId>>'+accId);
        return accId;
    }
}
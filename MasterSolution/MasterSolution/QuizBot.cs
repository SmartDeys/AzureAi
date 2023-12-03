using System;
using Azure;
using Azure.AI.OpenAI;
using Newtonsoft.Json;

namespace MasterSolution
{
    public class QuizBot
    {
        string userPromt;
        
        public static async Task<Dictionary<string, object>> GetTopicsByPromtAsync(string userPrompt)
        {
            try
            {
                string Url = "https://aoai.hacktogether.net";
                string key = "261ddb62-6e19-49df-aaa2-71c4168432a9/smartdeys";

                Uri proxyUrl = new(Url + "/v1/api");

                AzureKeyCredential token = new(key);
                OpenAIClient openAIClient = new(proxyUrl, token);
                ChatCompletionsOptions completionOptions = new()
                {
                    MaxTokens = 2048,
                    Temperature = 0.7f,
                    NucleusSamplingFactor = 0.95f,
                    DeploymentName = "gpt-35-turbo"
                };

                var CustomPrompt = "Im going to create a puzzle application with you.I will ask you about anything you should give me a list of string in JSOn as response based on the promt .I will use that in my application.\r\n\r\nPrompt: \"Give me a list of related topics to prepare a quiz game. And the another promt is given by my user\".\r\n\r\nSuggest him/her some related topics .\r\nFormat : Json of Dictionary of string and object.\r\nThat ditionary contains \"Title\" and \"Topics\".\r\nTitle will be a string. {TItle related to that topic}\r\nTopic will be in list of string.{Based of this topic he will start learnging}";
                completionOptions.Messages.Add(new ChatMessage(ChatRole.System, CustomPrompt + userPrompt));
                //completionOptions.Messages.Add(new ChatMessage(ChatRole.User, "hi there"));

                var response = await openAIClient.GetChatCompletionsAsync(completionOptions);
                Console.WriteLine("Generated text: " + response);

                var values = response.Value.Choices;
                var text = "";
                Dictionary<string, object> data = new Dictionary<string, object>();
                foreach (var choice in values)
                {
                    var message = choice.Message;
                    data = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, object>>(message.Content.ToString());
                    Console.WriteLine(message.Content);
                    Console.WriteLine("--");


                }
                return data;
            }
            catch (Exception e)
            {
                return null;
            }
        }
        
        public static async Task<List<Dictionary<string, object>>> GetGameData(string userPrompt)
        {
            try
            {
                string Url = "https://aoai.hacktogether.net";
                string key = "261ddb62-6e19-49df-aaa2-71c4168432a9/smartdeys";

                Uri proxyUrl = new(Url + "/v1/api");

                AzureKeyCredential token = new(key);
                OpenAIClient openAIClient = new(proxyUrl, token);
                ChatCompletionsOptions completionOptions = new()
                {
                    MaxTokens = 2048,
                    Temperature = 0.7f,
                    NucleusSamplingFactor = 0.95f,
                    DeploymentName = "gpt-35-turbo"
                };

                //var createGamePrompt = "Im plaining to create a quiz game with you.\r\nUser will give a one line topic. Based on that topic you need to give a 10 set of question.\r\nThat response should be in Json of list<dictionary of string ,object>.\r\nThat dictionary should have keys give below.\r\n\"Question\": That question {In string format}\r\n\"Options\": List of options to show. {In list of string}\r\n\"Answer\": Asnwer for that question.Which will be present in Options key. {String}.User one-line topic: ";
                //var usercreateGamePrompt =TopicPrompt = "Array in C";
                var createGamePrompt = "I am planning to create a quiz game with you. The user will provide a one-line topic. Based on that topic, you need to generate a JSON response in the format of List<Dictionary<string , object>>. Give me 10 questions set.\r\nGIve me a response as dictionary<string , object>. \r\n\"Topic\" ; Small title in string.\r\n\"Questions\": List of question in List<Dictionary<string , object>>{This Dictionary have  Question (string), Options ( List<string>) , Answer (string)}\r\n\r\n User one line prompt:";

                completionOptions.Messages.Add(new ChatMessage(ChatRole.System, createGamePrompt + userPrompt));
                var response = await openAIClient.GetChatCompletionsAsync(completionOptions);
                List<Dictionary<string, object>> questions = new List<Dictionary<string, object>>();
                foreach (var choice in response.Value.Choices)
                {
                    var message = choice.Message;
                    Dictionary<string, object> Questions = JsonConvert.DeserializeObject<Dictionary<string, object>>(message.Content.ToString());
                    questions = JsonConvert.DeserializeObject<List<Dictionary<string, object>>>(Questions["Questions"].ToString()); ;
                    Console.WriteLine(message.Content);
                    Console.WriteLine("--");
                }
                List<Dictionary<string, object>> finalQuestions = new List<Dictionary<string, object>>();
                foreach (var item in questions)
                {
                    Dictionary<string, object> tempItem = new Dictionary<string, object>();
                    tempItem = item;
                    item["optionJson"] = item["Options"].ToString();
                    finalQuestions.Add(item);
                }
                return questions;
            }
            catch (Exception e)
            {
                return null;
            }
        }
        public class QuizData {

            public string Question;
            public string Answer;
            public List<string> Options;

        }

    }


}

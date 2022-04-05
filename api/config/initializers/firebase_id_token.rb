FirebaseIdToken.configure do |config|
    config.redis = Redis.new
    config.project_ids = ['multimovie-ca626']
end